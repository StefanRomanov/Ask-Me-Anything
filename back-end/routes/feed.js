const router = require('express').Router();
const {body} = require('express-validator/check');
const {QueryController,  AnswerController} = require('../controllers');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

//Query routes
router.get('/queries', QueryController.getQueries);
router.get('/query/:queryId', QueryController.getQuery);
router.get('/queries/top', QueryController.getTopQuueries);
router.get('/queries/tagged', QueryController.searchByTag);

router.get('/queries/search', QueryController.searchByTitle);
router.post('/query/create', [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('description')
        .trim()
        .isLength({min: 5})
], QueryController.createQuery);
router.put('/query/update/:queryId', isAuth, [
    body('title')
        .trim()
        .isLength({min: 5}),
        body('description')
            .trim()
            .isLength({min: 5})
    ], QueryController.updateQuery);
router.post('/query/like', isAuth, QueryController.likeQuery);
router.post('/query/dislike', isAuth, QueryController.dislikeQuery);

router.delete('/query/:queryId', isAuth, QueryController.deleteQuery);


//Answer routes
router.get('/answers/:queryId', AnswerController.getAnswers);

router.post('/answer', isAuth,[
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
