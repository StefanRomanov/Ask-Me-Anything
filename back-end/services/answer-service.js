const db = require('../database/config');

class AnswerService {
    constructor(queryService, userService) {
        this.userService = userService;
        this.queryService = queryService;
    }

    findOneById(id) {
        return db.answer.findOne({
            where: {id: id}
        })
    }

    findAllByQueryId(queryId) {
        return db.answer.findAll({
            where: {QueryId: queryId}
        })
    }

    findAllByUserId(userId) {
        return db.answer.findOne({
            where: {UserId: userId}
        })
    }

    countAnswersByQueryId(queryId){
        return db.answer.count({
            where: {QueryId: queryId}
        })
    }

    createAnswer(content, userId, queryId) {
        return Promise.all([
            db.user.findOne({where: {id: userId}}),
            db.query.findOne({where: {id: queryId}}),
            db.answer.create({content})
        ])
            .then((values) => {
                const [user, query, answer] = values;
                if (user && query && answer) {
                    answer.setUser(user);
                    query.addAnswer(answer);
                } else {
                    const error = new Error('Entity not found');
                    error.statusCode = 404;
                    throw error;
                }
            })
    }

    deleteAnswer(answerId, userId, role) {
        return this.findOneById(answerId)
            .then(answer => {
                if (role !== 'ADMIN') {
                    const error = new Error('User is not admin');
                    error.statusCode = 401;
                    throw error;
                } else {
                    return db.answer.destroy({where: {id: answerId}})
                }
            });
    }

    updateAnswer(answerId, payload, userId) {
        return this.findOneById(answerId)
            .then(answer => {
                if (answer.UserId !== userId) {
                    const error = new Error('User is not the author');
                    error.statusCode = 401;
                    throw error;
                } else {
                    return db.answer.update(payload, {where: {id: answerId}})
                }
            });
    }

    increaseScore(id, amount) {
        return db.answer.increment(
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
        return db.answer.decrement(
            'score',
            {
                by: amount,
                where: {
                    id: id
                }
            }
        )
    }

    dislike(userId, answerId) {
        return Promise.all([
            this.userService.findUserById(userId),
            this.findOneById(answerId),
            db.answer_likes.findOne({where: {userId, answerId}}),
            db.answer_dislikes.findOne({where: {userId, answerId}})
        ])
            .then((result) => {
                const [user, answer, like, dislike] = result;

                if (user && answer && !dislike) {
                    if (answer.UserId === userId) {
                        const error = new Error('Cannot vote for your owm answers');
                        error.statusCode = 403;
                        throw error;
                    }

                    if (like) {
                        return Promise.all([
                            like.destroy(),
                            this.decreaseScore(answerId, 2),
                            this.userService.decreaseScore(answer.UserId, 2),
                            db.answer_dislikes.create({userId, answerId})
                        ])
                    }

                    return Promise.all([
                        this.decreaseScore(answerId, 1),
                        this.userService.decreaseScore(answer.UserId, 1),
                        db.answer_dislikes.create({userId, answerId})
                    ])
                } else {
                    const error = new Error('Invalid operation');
                    error.statusCode = 500;
                    throw error;
                }
            });
    }

    like(userId, answerId) {
        return Promise.all([
            this.userService.findUserById(userId),
            this.findOneById(answerId),
            db.answer_likes.findOne({where: {userId, answerId}}),
            db.answer_dislikes.findOne({where: {userId, answerId}})
        ])
            .then((result) => {
                const [user, answer, like, dislike] = result;
                if (user && answer && !like) {
                    if (answer.UserId === userId) {
                        const error = new Error('Cannot vote for your owm answers');
                        error.statusCode = 403;
                        throw error;
                    }

                    if (dislike) {
                        return Promise.all([
                            dislike.destroy(),
                            this.increaseScore(answerId, 2),
                            this.userService.increaseScore(answer.UserId, 2),
                            db.answer_likes.create({userId, answerId}),
                        ])
                    }

                    return Promise.all([
                        this.increaseScore(answerId, 1),
                        this.userService.increaseScore(answer.UserId, 1),
                        db.answer_likes.create({userId, answerId}),
                    ])
                } else {
                    const error = new Error('Invalid operation');
                    error.statusCode = 500;
                    throw error;
                }
            });
    }

    isLikedByUser(userId, answerId) {
        return db.answer_likes.findOne({where: {userId, answerId}});
    }

    isDislikedByUser(userId, answerId) {
        return db.answer_dislikes.findOne({where: {userId, answerId}});
    }

    modifyAnswers(answers, userId) {

        return answers.map(a => {
            return Promise.all([
                this.isDislikedByUser(userId, a.id),
                this.isLikedByUser(userId, a.id)
            ])
                .then(result => {
                    const [dislike, like] = result;
                    a.dataValues.isLiked = !!like;
                    a.dataValues.isDisliked = !!dislike;
                    a.dataValues.isOwner = a.UserId === userId;

                    return a;
                })
        })
    }
}

module.exports = (queryService, userService) => {
    return new AnswerService(queryService, userService);
};
