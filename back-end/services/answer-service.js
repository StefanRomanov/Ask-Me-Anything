const db = require('../database/config');

const UserService = require('./user-service');
const QueryService = require('./query-service');

module.exports = {

    findAllByQueryId(queryId) {
        return db.answer.findOne({
            where: {QueryId: queryId}
        })
    },
    findAllByUserId(userId) {
        return db.answer.findOne({
            where: {UserId: userId}
        })
    },

    createAnswer: (title, description, userId, queryId) => {

        return db.user.findOne({where: {id: userId}})
            .then(user => {
                db.query.findOne({where: {id: queryId}})
                    .then(query => {
                        db.answer.create({title, description})
                            .then(answer => {
                                answer.setUser(user);
                                answer.setQuery(query);
                            })
                    })
            })
    },

    increaseScore: (id) => {
        return db.answer.increment(
            'score',
            {
                where: {
                    id: id
                }
            }
        )
    },
    decreaseScore: (id) => {
        return db.answer.decrement(
            'score',
            {
                where: {
                    id: id
                }
            }
        )
    },
};
