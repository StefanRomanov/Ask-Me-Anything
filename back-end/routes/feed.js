const router = require('express').Router();
const {body} = require('express-validator/check');
const {QueryController, AnswerController} = require('../controllers');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const isAnonymous = require('../middleware/is-anonymous');

//Query routes
router.get('/queries', QueryController.getQueries);
router.get('/query/:queryId', isAnonymous, QueryController.getQuery);
router.get('/queries/latest', QueryController.getLatestQueries);
router.get('/queries/user/:userId', QueryController.getByUser);
router.get('/queries/search', QueryController.searchByTitle);

router.post('/query/create', [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('description')
        .trim()
        .isLength({min: 5})
], QueryController.createQuery);
router.post('/query/like', isAuth, QueryController.likeQuery);
router.post('/query/dislike', isAuth, QueryController.dislikeQuery);

router.put('/query/update/:queryId', isAuth, [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('description')
        .trim()
        .isLength({min: 5})
], QueryController.updateQuery);

router.delete('/query/:queryId', isAuth, QueryController.deleteQuery);


//Answer routes
router.get('/answers/:queryId', AnswerController.getAnswers);

router.post('/answer', isAuth, [
    body('content')
        .trim()
        .isLength({min: 5})
], AnswerController.createAnswer);
router.post('/answer/like', isAuth, AnswerController.likeAnswer);
router.post('/answer/dislike', isAuth, AnswerController.dislikeAnswer);

router.put('/answer/:answerId', isAuth, [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('description')
        .trim()
        .isLength({min: 5})
], AnswerController.updateAnswer);

router.delete('/answer/:answerId', isAuth, AnswerController.deleteAnswer);


module.exports = router;
