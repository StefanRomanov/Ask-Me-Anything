const router = require('express').Router();
const {body} = require('express-validator/check');
const authController = require('../controllers/auth');
const UserService = require('../services/user-service');

router.post('/signup',
    [
        body('username')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Please enter a valid name.')
            .custom((value, {req}) => {
                return UserService.findUserByUsername({username: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Username address already exists!');
                    }
                })
            }),
        body('password')
            .trim()
            .isLength({min: 5})
            .withMessage('Please enter a valid password.'),
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email.')
    ]
    , authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
