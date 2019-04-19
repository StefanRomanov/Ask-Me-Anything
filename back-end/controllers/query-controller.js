const QueryService = require("../services/query-service");
const UserService = require('../services/user-service');
const AnswerService = require('../services/answer-service');
const validateQuery = require('../util/validateCreation');


const userService = UserService();
const queryService = QueryService(userService);
const answerService = AnswerService(queryService, userService);

module.exports = {

    getQueries: (req, res, next) => {
        const order = req.query.order;
        const page = req.query.page;
        const search = req.query.search || '';
        const tagString = req.query.tags || '';
        const tags = tagString.split('-');

        queryService.findByTitleContainsAndOrderAndTags(search, order, tags, page)
            .then((result) => {
                res
                    .status(200)
                    .json({
                        message: `${result.count} queries found`,
                        success: true,
                        content: result.rows,
                        count: result.count
                    })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    getQuery: (req, res, next) => {
        const queryId = req.params.queryId;
        const userId = req.userId;

        queryService.findOneById(queryId)
            .then(query => {
                if (!userId) {
                    const error = new Error('Unauthorized');
                    error.statusCode = 401;
                    throw error;
                } else {
                    res
                        .status(200)
                        .json({message: `Query found`, success: true, content: query})
                }
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    getByUser: (req, res, next) => {

        const order = req.query.order;
        const page = req.query.page;
        const userId = req.params.userId;
        const title = req.query.search || '';
        const tagString = req.query.tags || '';
        const tags = tagString.split('-');

        queryService.findAllByUserIdAndTitleIncludesAndOrderAndTags(userId, title, order, tags, page)
            .then((result) => {
                res
                    .status(200)
                    .json({
                        message: `${result.count} queries found`,
                        success: true,
                        content: result.rows,
                        count: result.count
                    })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    getLatestQueries: (req, res, next) => {
        queryService.findLatestFive()
            .then(queries => {
                res
                    .status(200)
                    .json({message: `${queries.length} queries found`, success: true, content: queries})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })

    },

    createQuery: (req, res, next) => {

        if (validateQuery(req, res)) {
            const {title, description, tags, userId} = req.body;

            queryService.createQuery(title, description, tags, userId)
                .then(() => {
                    res
                        .status(200)
                        .json({message: 'Query created !', success: true})
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                })
        }
    },

    getQueryDetails: (req, res, next) => {
        const queryId = req.params.queryId;
        const userId = req.userId;
        const order = req.query.answers;
        const page = req.query.page;

        let response;

        if (userId) {
            response = queryDetailsAuthed(req, res, queryId, userId, order, page);
        } else {
            response = queryDetailsAnonymous(req, res, queryId, order, page);
        }

        response
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    deleteQuery: (req, res, next) => {
        const queryId = req.params.queryId;
        const userId = req.userId;
        const role = req.role;

        queryService.deleteQuery(queryId, userId, role)
            .then(() => {
                res
                    .status(200)
                    .json({message: `Query deleted`, success: true})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    updateQuery: (req, res, next) => {

        if (validateQuery(req, res)) {
            const queryId = req.params.queryId;
            const payload = req.body;
            const userId = req.userId;

            queryService.updateQuery(queryId, payload, userId)
                .then(() => {
                    res
                        .status(200)
                        .json({message: 'Query updated', success: true})
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                })
        }
    },

    likeQuery: (req, res, next) => {
        const userId = req.userId;
        const {queryId} = req.body;

        queryService.like(userId, queryId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Query liked', success: true})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    dislikeQuery: (req, res, next) => {
        const userId = req.userId;
        const {queryId} = req.body;

        queryService.dislike(userId, queryId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Query disliked', success: true})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    markSolved: (req, res, next) => {
        const userId = req.userId;
        const {queryId} = req.body;

        queryService.markSolved(queryId, userId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Query closed', success: true})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    openQuery: (req, res, next) => {
        const userId = req.userId;
        const {queryId} = req.body;

        queryService.openQuery(queryId, userId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Query opened', success: true})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    }
};

function queryDetailsAuthed(req, res, queryId, userId, order, page) {

    return Promise.all([
        queryService.findOneByIdOrderAnswers(queryId, order, page),
        userService.findUserById(userId)
    ])
        .then(result => {
            const [query, user] = result;
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            if (!query) {
                const error = new Error('Query not found');
                error.statusCode = 404;
                throw error;
            } else {

                return Promise.all([
                    queryService.isLikedByUser(user.id, query.id),
                    queryService.isDislikedByUser(user.id, query.id),
                    answerService.countAnswersByQueryId(query.id),
                    ...answerService.modifyAnswers(query.Answers, userId)
                ])
                    .then(result => {
                        const [like, dislike, count, ...answers] = result;

                        query.Answers = answers;
                        query.dataValues.isLiked = !!like;
                        query.dataValues.isDisliked = !!dislike;

                        query.dataValues.isOwner = query.UserId === user.id;

                        res
                            .status(200)
                            .json({message: 'Query found', success: false, content: query, count})
                    })
            }
        })

}

function queryDetailsAnonymous(req, res, queryId, order, page) {

    return queryService.findOneByIdOrderAnswers(queryId, order, page)
        .then(query => {
            if (!query) {
                const error = new Error('Query not found');
                error.statusCode = 404;
                throw error;
            } else {
                return answerService.countAnswersByQueryId(query.id)
                    .then(count => {
                        res
                            .status(200)
                            .json({message: `Query found`, success: true, content: query, count})
                    })

            }
        })
}
