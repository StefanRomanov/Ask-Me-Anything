const QueryService = require("../services/query-service");
const UserService = require('../services/user-service');
const validateQuery = require('../util/validateCreation');


const userService = UserService();
const queryService = QueryService(userService);

module.exports = {
    getQueries: (req, res, next) => {
        queryService.findAll()
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

    createQuery: (req, res, next) => {

        if (validateQuery(req, res)) {
            const {title, description, tags, username} = req.body;

            queryService.createQuery(title, description, tags, username)
                .then(() => {
                    res
                        .status(200)
                        .json({message: 'Query created !', success: true})
                })
                .catch(err => {
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

        Promise.all([
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
                    query.isLiked = queryService.isLikedByUser(userId, query.id);
                    query.isDisliked = queryService.isDislikedByUser(userId, query.id);
                    query.isOwner = query.UserId === user.id;

                    res
                        .status(200)
                        .json({message: `Query found`, success: true, query})
                }
            })
            .catch(err => {
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

        queryService.deleteQuery(queryId,userId, role)
            .then(() => {
                res
                    .status(200)
                    .json({message: `Query deleted`, success: true})
            })
            .catch(err => {
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
                .catch(err => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                })
        }
    },

    likeQuery: (req,res, next) => {
        const userId = req.userId;
        const queryId = req.params.queryId;

        queryService.like(userId,queryId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Query liked', success: true})
            })
            .catch(err => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    dislikeQuery: (req,res, next) => {
        const userId = req.userId;
        const queryId = req.params.queryId;

        queryService.dislike(userId,queryId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Query disliked', success: true})
            })
            .catch(err => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    }
};
