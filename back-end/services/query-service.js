const db = require('../database/config');

class QueryService {
    constructor(userService) {
        this.userService = userService;
    }

    findAll() {
        return db.query.findAll({
            include:[{
                model: db.user,
                attributes: ['id','username']
            }]
        });
    }

    findOneById(id) {
        return db.query.findOne({
            where: {id: id},
            include: [{
                model: db.answer,
                include: {
                    model: db.user,
                    attributes: ['id', 'username']
                }
            }, {
                model: db.user,
                attributes: ['id', 'username']
            }]
        })
    }

    deleteQuery(id, userId, role) {
        return this.findOneById(id)
            .then(query => {
                if (query.UserId !== userId || role !== 'ADMIN') {
                    throw new Error('Unauthorized. User is not author or admin !');
                } else {
                    return db.query.destroy({where: {id: id}})
                }
            });
    }

    updateQuery(id, payload, userId) {

        return this.findOneById(id)
            .then(query => {
                if (query.UserId !== userId) {
                    throw new Error('Unauthorized. User is not author or admin !');
                } else {
                    return db.query.update(payload, {where: {id: id}})
                }
            });
    }

    increaseScore(id,amount) {
        return db.query.increment(
            'score',
            {
                by: amount,
                where: {
                    id: id
                }
            }
        )
    }

    decreaseScore(id, amount) {
        return db.query.decrement(
            'score',
            {
                by: amount,
                where: {
                    id: id
                }
            }
        )
    }

    findByTitleContains(title) {
        return db.query.findAll({
            where: {
                title: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('title')), 'LIKE', '%' + title + '%'),
            },
            include:[{
                model: db.user,
                attributes: ['id','username']
            }]
        })
    }

    findByTags(tag) {

        const {fn, col} = db.sequelize;

        return db.query.findAll({
            where: fn('JSON_CONTAINS', col('tags'), `\"${tag}\"`),
            include:[{
                model: db.user,
                attributes: ['id','username']
            }]
        })
    }

    createQuery(title, description, tags, username) {
        return Promise.all([
            this.userService.findUserByUsername(username),
            db.query.create({
                title,
                description,
                tags
            })])
            .then(values => {
                const [user, query] = values;
                console.log(query);
                query.setUser(user);
            })
    }

    dislike(userId, queryId) {
        return Promise.all([
            this.userService.findUserById(userId),
            this.findOneById(queryId),
            db.query_likes.findOne({where: {userId, queryId}}),
            db.query_dislikes.findOne({where: {userId, queryId}})
        ])
            .then((result) => {
                const [user, query, like, dislike] = result;
                if (user && query && !dislike) {
                    if (query.UserId === userId) {
                        throw 'Cannot vote for your own queries';
                    }

                    if (like) {
                        return Promise.all([
                            like.destroy(),
                            this.decreaseScore(queryId,2),
                            this.userService.decreaseScore(userId, 2),
                            db.query_dislikes.create({userId, queryId})
                        ])
                    }

                    return Promise.all([
                        this.decreaseScore(queryId, 1),
                        this.userService.decreaseScore(userId, 1),
                        db.query_dislikes.create({userId, queryId})]);

                } else {
                    throw 'Invalid operation';
                }
            });
    }

    like(userId, queryId) {
        return Promise.all([
            this.userService.findUserById(userId),
            this.findOneById(queryId),
            db.query_likes.findOne({where: {userId, queryId}}),
            db.query_dislikes.findOne({where: {userId, queryId}})
        ])
            .then((result) => {
                const [user, query, like, dislike] = result;
                if (user && query && !like) {
                    if (query.UserId === userId) {
                        throw 'Cannot vote for your own queries';
                    }

                    if (dislike) {
                        return Promise.all([
                            dislike.destroy(),
                            this.increaseScore(queryId, 2),
                            this.userService.increaseScore(userId, 2),
                            db.query_likes.create({userId, queryId})
                        ])
                    }

                    return Promise.all([
                        this.increaseScore(queryId, 1),
                        this.userService.increaseScore(userId, 1),
                        db.query_likes.create({userId, queryId})]);
                } else {
                    throw 'Invalid operation';
                }
            });
    }

    isLikedByUser(userId, answerId) {
        return db.query_likes.findOne({where: {userId, answerId}});
    }

    isDislikedByUser(userId, answerId) {
        return db.query_dislikes.findOne({where: {userId, answerId}});
    }
}

module.exports = (userService) => {
    return new QueryService(userService);
};
