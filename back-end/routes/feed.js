const router = require('express').Router();
const {body} = require('express-validator/check');
const {QueryController,  AnswerController} = require('../controllers');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

//Query routes
router.get('/queries', QueryController.getQueries);
router.post('/query/create', [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('description')
        .trim()
        .isLength({min: 5})
], QueryController.createQuery);
router.get('/query/:queryId', QueryController.getQuery);
router.delete('/query/:queryId', isAuth, QueryController.deleteQuery);
router.put('/query/update/:queryId', isAuth, [
    body('title')
        .trim()
        .isLength({min: 5}),
        body('description')
            .trim()
            .isLength({min: 5})
    ], QueryController.updateQuery);
router.post('/query/like/:queryId', isAuth, QueryController.likeQuery);
router.post('/query/dislike/:queryId', isAuth, QueryController.dislikeQuery);
router.get('/queries/tagged', QueryController.searchByTag);
router.get('/queries/search', QueryController.searchByTitle);

//Answer routes
router.get('/answers/:queryId', AnswerController.getAnswers);
router.post('/query/:queryId/answer', isAuth,[
    body('title')
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
        .isLength({min: 5})
], AnswerController.createAnswer);
router.delete('/answer/:answerId', isAuth, AnswerController.deleteAnswer);
router.put('/answer/:answerId', isAuth, [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('description')
        .trim()
        .isLength({min: 5})
], AnswerController.updateAnswer);
router.post('/answer/like/:answerId', isAuth, AnswerController.likeAnswer);
router.post('/answer/dislike/:answerId', isAuth, AnswerController.dislikeAnswer);

module.exports = router;
