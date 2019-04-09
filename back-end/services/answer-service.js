const db = require('../database/config');

class AnswerService {
    constructor(queryService,userService){
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

    createAnswer(content, userId, queryId){
        return Promise.all([
            db.user.findOne({where: {id: userId}}),
            db.query.findOne({where: {id: queryId}}),
            db.answer.create({content})
        ])
            .then((values) => {
                const [user, query, answer] = values;
                if(user && query && answer){
                    answer.setUser(user);
                    query.addAnswer(answer);
                } else {
                    throw 'Entity doesn\'t exist';
                }
            })
    }

    deleteAnswer(queryId,userId, role) {
        return this.findOneById(id)
            .then(answer => {
                if (answer.UserId !== userId ){
                    throw new Error('Unauthorized. User is not author or admin !');
                } else {
                    return db.answer.destroy({where: {id: id}})
                }
            });
    }

    updateAnswer(id, payload, userId){
        return this.findOneById(id)
            .then(answer => {
                if (answer.UserId !== userId ){
                    throw new Error('Unauthorized. User is not author or admin !');
                } else {
                    return db.answer.update(payload, {where: {id: id}})
                }
            });
    }

    increaseScore(id){
        return db.answer.increment(
            'score',
            {
                where: {
                    id: id
                }
            }
        )
    }
    decreaseScore(id){
        return db.answer.decrement(
            'score',
            {
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
                    if(answer.UserId === userId){
                        throw 'Cannot vote for your own queries';
                    }

                    if (like) {
                        like.destroy();
                        this.decreaseScore(answerId);
                        this.userService.decreaseScore(user.username);
                    }

                    this.decreaseScore(answerId);
                    this.userService.decreaseScore(user.username);

                    return db.query_dislikes.create({userId, answerId})
                } else {
                    throw 'Invalid operation';
                }
            });
    }

    like(userId, answerId) {
        return Promise.all([
            this.userService.findUserById(userId),
            this.findOneById(answerId),
            db.query_likes.findOne({where: {userId, answerId}}),
            db.query_dislikes.findOne({where: {userId, answerId}})
        ])
            .then((result) => {
                const [user, query, like, dislike] = result;
                if (user && query && !like) {
                    if(query.UserId === userId){
                        throw 'Cannot vote for your own queries';
                    }

                    if (dislike) {
                        dislike.destroy();
                        this.increaseScore(answerId);
                        this.userService.increaseScore(user.username);
                    }

                    this.increaseScore(answerId);
                    this.userService.increaseScore(user.username);
                    return db.query_likes.create({userId, answerId})
                } else {
                    throw 'Invalid operation';
                }
            });
    }

    isLikedByUser(userId, answerId){
        return db.answer_likes.findOne({where: {userId,answerId}});
    }

    isDislikedByUser(userId, answerId){
        return db.answer_dislikes.findOne({where: {userId,answerId}});
    }
}

module.exports = (queryService, userService) => {
    return new AnswerService(queryService,userService);
};
