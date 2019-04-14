const QueryService = require("../services/query-service");
const UserService = require('../services/user-service');
const AnswerService = require('../services/answer-service');

const validateAnswer = require('../util/validateCreation');

const answerService = AnswerService(QueryService(UserService()),UserService());

module.exports = {
    getAnswers: (req, res, next) =>{
        const queryId = req.params.queryId;
        const userId = req.userId;

        answerService.findAllByQueryId(queryId)
            .then((answers) => {
                answers.forEach(a => {
                   a.isLiked = answerService.isLikedByUser(userId);
                   a.isDisliked = answerService.isDislikedByUser(userId);
                   a.isOwner = a.UserId === userId;
                });
                res
                    .status(200)
                    .json({message: `${answers.length} queries found`, answers})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    createAnswer: (req, res, next) => {
        if(validateAnswer(req,res)){
            const userId = req.userId;
            console.error(userId);
            const {content, queryId} = req.body;

            answerService.createAnswer(content,userId,queryId)
                .then(() => {
                    res
                        .status(200)
                        .json({message: 'Answer created !', success: true})
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                })
        }
    },

    deleteAnswer: (req, res, next) => {
        const queryId = req.params.queryId;
        const userId = req.userId;
        const role = req.role;

        answerService.deleteAnswer(queryId,userId, role)
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

    updateAnswer: (req, res, next) => {
        if (validateAnswer(req, res)) {
            const answerId = req.params.answerId;
            const payload = req.body;
            const userId = req.userId;

            answerService.updateAnswer(answerId, payload, userId)
                .then(() => {
                    res
                        .status(200)
                        .json({message: 'Answer updated', success: true})
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                })
        }
    },

    likeAnswer: (req,res, next) => {
        const userId = req.userId;
        const {answerId} = req.body;

        answerService.like(userId,answerId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Answer liked !', success: true})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            });
    },

    dislikeAnswer: (req, res, next) => {
        const userId = req.userId;
        const {answerId} = req.body;

        answerService.dislike(userId,answerId)
            .then(() => {
                res
                    .status(200)
                    .json({message: 'Answer disliked !', success: true})
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            });
    }
};
