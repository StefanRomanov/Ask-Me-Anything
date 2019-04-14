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
                    throw 'Entity doesn\'t exist';
                }
            })
    }

    deleteAnswer(queryId, userId, role) {
        return this.findOneById(id)
            .then(answer => {
                if (answer.UserId !== userId) {
                    throw new Error('Unauthorized. User is not author or admin !');
                } else {
                    return db.answer.destroy({where: {id: id}})
                }
            });
    }

    updateAnswer(id, payload, userId) {
        return this.findOneById(id)
            .then(answer => {
                if (answer.UserId !== userId) {
                    throw new Error('Unauthorized. User is not author or admin !');
                } else {
                    return db.answer.update(payload, {where: {id: id}})
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
                console.error(result);
                if (user && answer && !dislike) {
                    if (answer.UserId === userId) {
                        throw 'Cannot vote for your own answers';
                    }

                    if (like) {
                        return Promise.all([
                            like.destroy(),
                            this.decreaseScore(answerId, 2),
                            this.userService.decreaseScore(userId, 2),
                            db.answer_dislikes.create({userId, answerId})
                        ])
                    }

                    return Promise.all([
                        this.decreaseScore(answerId, 1),
                        this.userService.decreaseScore(userId, 1),
                        db.answer_dislikes.create({userId, answerId})
                    ])
                } else {
                    throw 'Invalid operation';
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
                const [user, query, like, dislike] = result;
                if (user && query && !like) {
                    if (query.UserId === userId) {
                        throw 'Cannot vote for your own answers';
                    }

                    if (dislike) {
                        return Promise.all([
                            dislike.destroy(),
                            this.increaseScore(answerId, 2),
                            this.userService.increaseScore(userId, 2),
                            db.answer_likes.create({userId, answerId}),
                        ])
                    }

                    return Promise.all([
                        this.increaseScore(answerId, 1),
                        this.userService.increaseScore(userId, 1),
                        db.answer_likes.create({userId, answerId}),
                    ])
                } else {
                    throw 'Invalid operation';
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
