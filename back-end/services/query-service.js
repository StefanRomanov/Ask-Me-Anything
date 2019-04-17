const db = require('../database/config');
const paginator = require('../util/pagination');

class QueryService {
    constructor(userService) {
        this.userService = userService;
    }

    findAllByUserIdAndTitleIncludesAndOrderAndTags(id, title, order, tags, page) {

        const orderArgument = getOrderArgument(order);
        const tagsFilter = getTagsArgument(tags);

        return db.query.findAndCountAll({
            order: orderArgument,
            where: {
                UserId: id,
                title: db.sequelize.where(db.sequelize.fn('LOWER', db.sequelize.col('title')), 'LIKE', '%' + title + '%'),
                ...tagsFilter,
            },
            include: [{
                model: db.user,
                attributes: ['id', 'username','score']
            }],
            ...paginator(page, 5)
        });
    }

    findByTitleContainsAndOrderAndTags(title, order, tags, page) {

        const tagsFilter = getTagsArgument(tags);
        const orderArgument = getOrderArgument(order);

        return db.query.findAndCountAll({
            order: orderArgument,
            where: {
                title: db.sequelize.where(db.sequelize.fn('LOWER', db.sequelize.col('title')), 'LIKE', '%' + title + '%'),
                ...tagsFilter
            },
            include: [{
                model: db.user,
                attributes: ['id', 'username', 'score']
            }],
            ...paginator(page, 5)
        })
    }

    findOneByIdOrderAnswers(id, order, page) {

        return db.query.findOne({
            where: {id: id},
            include: [{
                model: db.answer,
                include: {
                    model: db.user,
                    attributes: ['id', 'username','score'],
                },
                order: [[order, 'DESC']],
                ...paginator(page, 5)
            }, {
                model: db.user,
                attributes: ['id', 'username', 'score']
            }],

        })
    }

    findOneById(id) {
        return db.query.findOne({
            where: {id: id},
        })
    }

    findLatestFive() {
        return db.query.findAll({
            order: [['createdAt', 'DESC']],
            include: {
                model: db.user,
                attributes: ['id', 'username', 'score']
            },
            limit: 5
        })
    }

    deleteQuery(id, userId, role) {
        return this.findOneById(id)
            .then(query => {
                if (role !== 'ADMIN') {
                    const error = new Error('Unauthorized. User is not admin');
                    error.statusCode = 401;
                    throw error;
                } else {
                    return db.query.destroy({where: {id: id}})
                }
            });
    }

    updateQuery(id, payload, userId) {

        return this.findOneById(id)
            .then(query => {
                if (query.UserId !== userId) {
                    const error = new Error('Unauthorized. User is not the author');
                    error.statusCode = 401;
                    throw error;
                } else {
                    return db.query.update(payload, {where: {id: id}})
                }
            });
    }

    increaseScore(id, amount) {
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
                        const error = new Error('Cannot vote for your own queries !');
                        error.statusCode = 403;
                        throw error;
                    }

                    if (like) {
                        return Promise.all([
                            like.destroy(),
                            this.decreaseScore(queryId, 2),
                            this.userService.decreaseScore(query.UserId, 2),
                            db.query_dislikes.create({userId, queryId})
                        ])
                    }

                    return Promise.all([
                        this.decreaseScore(queryId, 1),
                        this.userService.decreaseScore(query.UserId, 1),
                        db.query_dislikes.create({userId, queryId})]);

                } else {
                    const error = new Error('Invalid operation');
                    error.statusCode = 500;
                    throw error;
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
                        const error = new Error('Cannot vote for your own queries !');
                        error.statusCode = 403;
                        throw error;
                    }

                    if (dislike) {
                        return Promise.all([
                            dislike.destroy(),
                            this.increaseScore(queryId, 2),
                            this.userService.increaseScore(query.UserId, 2),
                            db.query_likes.create({userId, queryId})
                        ])
                    }

                    return Promise.all([
                        this.increaseScore(queryId, 1),
                        this.userService.increaseScore(query.UserId, 1),
                        db.query_likes.create({userId, queryId})]);
                } else {
                    const error = new Error('Invalid operation');
                    error.statusCode = 500;
                    throw error;
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
                if (!query) {
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

function getOrderArgument(order) {
    let orderArgument = [['score', 'DESC']];
    if (order === 'latest') {
        orderArgument = [['createdAt', 'DESC']];
    }

    return orderArgument;
}

function getTagsArgument(tags) {
    let tagsFilter = {tags: {[db.Sequelize.Op.contains]: tags}};

    if (tags.length === 1 && tags[0] === '') {
        tagsFilter = null;
    }

    return tagsFilter;
}
