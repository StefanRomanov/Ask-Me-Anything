const router = require('express').Router();
const {body} = require('express-validator/check');
const {QueryController, AnswerController} = require('../controllers');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const isAnonymous = require('../middleware/is-anonymous');
const isUser = require('../middleware/is-user');

//Query routes
router.get('/queries', QueryController.getQueries);
router.get('/query/:queryId', isAnonymous, QueryController.getQuery);
router.get('/query/details/:queryId', isAnonymous, QueryController.getQueryDetails);
router.get('/queries/latest', QueryController.getLatestQueries);
router.get('/queries/user/:userId',isAuth, isUser ,QueryController.getByUser);

router.post('/query/create', [
    body('title')
        .trim()
        .isLength({min: 5, max: 50}),
    body('description')
        .trim()
        .isLength({min: 5,max: 2000})
],isAuth, isUser , QueryController.createQuery);
router.post('/query/close', isAuth, isAdmin, QueryController.markSolved);
router.post('/query/open', isAuth, isAdmin, QueryController.openQuery);
router.post('/query/like', isAuth, QueryController.likeQuery);
router.post('/query/dislike', isAuth, QueryController.dislikeQuery);

router.put('/query/update/:queryId', isAuth, [
    body('title')
        .trim()
        .isLength({min: 5, max: 50}),
    body('description')
        .trim()
        .isLength({min: 5,max: 2500})
], QueryController.updateQuery);

router.delete('/query/:queryId', isAuth, isAdmin, QueryController.deleteQuery);


//Answer routes
router.get('/answers/:queryId', AnswerController.getAnswers);

router.post('/answer', isAuth, [
    body('content')
        .trim()
        .isLength({min: 5, max: 2000})
], AnswerController.createAnswer);
router.post('/answer/like', isAuth, AnswerController.likeAnswer);
router.post('/answer/dislike', isAuth, AnswerController.dislikeAnswer);

router.put('/answer/:answerId', isAuth, [
    body('content')
        .trim()
        .isLength({min: 5, max: 2000})
], AnswerController.updateAnswer);

router.delete('/answer/:answerId', isAuth, isAdmin, AnswerController.deleteAnswer);


module.exports = router;
