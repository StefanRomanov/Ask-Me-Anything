const QueryService = require("../services/query-service");
const UserService = require('../services/user-service');
const validateQuery = require('../util/validateCreation');


const userService = UserService();
const queryService = QueryService(userService);

module.exports = {

    getQueries: (req, res, next) => {
        const order = req.query.order;
        const search = req.query.search || '';
        const tagString = req.query.tags || '';
        const tags = tagString.split('-');

        queryService.findByTitleContainsAndOrderAndTags(search, order, tags)
            .then((queries) => {
                res
                    .status(200)
                    .json({message: `${queries.length} queries found`, success: true, queries})
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
        const userId = req.params.userId;
        const title = req.query.title || '';
        const tagString = req.query.tags || '';
        const tags = tagString.split('-');

        queryService.findAllByUserIdAndTitleIncludesAndOrderAndTags(userId, title, order, tags)
            .then((queries) => {
                res
                    .status(200)
                    .json({message: `${queries.length} queries found`, success: true, queries})
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
                    .json({message: `${queries.length} queries found`, success: true, queries})
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

    getQuery: (req, res, next) => {
        const queryId = req.params.queryId;
        const userId = req.userId;

        let response;

        if (userId) {
            response = queryDetailsAuthed(req, res, queryId, userId);
        } else {
            response = queryDetailsAnonymous(req, res, queryId);
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

    searchByTitle: (req, res, next) => {
        const title = req.query.title;

        queryService.findByTitleContains(title)
            .then(queries => {
                res
                    .status(200)
                    .json({message: `${queries.length} queries found`, success: true, queries})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    }
};

function queryDetailsAuthed(req, res, queryId, userId) {

    return Promise.all([
        queryService.findOneById(queryId),
        userService.findUserById(userId)
    ])
        .then(result => {
            const [query, user] = result;
            if (!user) {
                res
                    .status(404)
                    .json({message: 'User not found', success: false,})
            }
            if (!query) {
                res
                    .status(404)
                    .json({message: 'Query not found', success: false,})
            } else {
                return Promise.all([
                    queryService.isLikedByUser(user.id, query.id),
                    queryService.isDislikedByUser(user.id, query.id)
                ])
                    .then(result => {
                        const [like, dislike] = result;

                        query.dataValues.isLiked = !!like;
                        query.dataValues.isDisliked = !!dislike;

                        query.dataValues.isOwner = query.UserId === user.id;
                        res
                            .status(200)
                            .json({message: `Query found`, success: true, query})
                    })
            }
        })

}

function queryDetailsAnonymous(req, res, queryId) {

    return queryService.findOneById(queryId)
        .then(query => {
            if (!query) {
                res
                    .status(404)
                    .json({message: 'Query not found', success: false,})
            } else {
                res
                    .status(200)
                    .json({message: `Query found`, success: true, query})
            }
        })
}
