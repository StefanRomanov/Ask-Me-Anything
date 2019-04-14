const db = require('../database/config');

class QueryService {
    constructor(userService) {
        this.userService = userService;
    }

    findAllByUserIdAndTitleIncludesAndOrderAndTags(id, title, order, tags) {

        const orderArgument = getOrderArgument(order);
        const tagsFilter = getTagsArgument(tags);

        return db.query.findAll({
            order: orderArgument,
            where: {
                UserId: id,
                title: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('title')), 'LIKE', '%' + title + '%'),
                ...tagsFilter,
            },
            include:[{
                model: db.user,
                attributes: ['id','username']
            }]
        });
    }

    findByTitleContainsAndOrderAndTags(title, order, tags) {

        const tagsFilter = getTagsArgument(tags);
        const orderArgument = getOrderArgument(order);

        return db.query.findAll({
            order: orderArgument,
            where: {
                title: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('title')), 'LIKE', '%' + title + '%'),
                ...tagsFilter
            },
            include:[{
                model: db.user,
                attributes: ['id','username']
            }]
        })
    }

    findOneByIdOrderAnswers(id, order) {
        console.error(order);

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
            }],
            order: [[db.answer, order, 'DESC']]
        })
    }

    findOneById(id) {
        return db.query.findOne({
            where: {id: id},
        })
    }

    findLatestFive() {
        return db.query.findAll({
            order: [['createdAt','DESC']],
            include: {
                model: db.user,
                attributes: ['id', 'username']
            },
            limit: 5
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

    createQuery(title, description, tags, userId) {
        return Promise.all([
            this.userService.findUserById(userId),
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

    isLikedByUser(userId, queryId) {
        return db.query_likes.findOne({where: {userId, queryId}});
    }

    isDislikedByUser(userId, queryId) {
        return db.query_dislikes.findOne({where: {userId, queryId}});
    }

    markSolved(queryId, userId) {

        return this.findOneById(queryId)
            .then(query => {
                if(!query) {
                    const error = new Error('Query not found');
                    error.statusCode = 404;
                    throw error;
                } else {
                    return query.update({
                        solved: true
                    })
                }
            })
    }
}

module.exports = (userService) => {
    return new QueryService(userService);
};

function getOrderArgument(order){
    let orderArgument = [['score', 'DESC']];
    if(order === 'latest'){
        orderArgument = [['createdAt', 'DESC']];
    }

    return orderArgument;
}

function getTagsArgument(tags) {
    let tagsFilter = {tags: { [db.Sequelize.Op.contains]: tags }};

    if(tags.length === 1 && tags[0] === ''){
        tagsFilter = null;
    }

    return tagsFilter;
}
