const router = require('express').Router();
const {body} = require('express-validator/check');
const authController = require('../controllers/auth-controller');
const UserService = require('../services/user-service');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const userService = UserService();

router.post('/register',
    [
        body('username')
            .not()
            .isEmpty()
            .withMessage('Please enter a valid name.')
            .custom((value) => {
                return userService.findUserByUsername(value).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Username address already exists!');
                    }
                })
            }),
        body('password')
            .trim()
            .isLength({min: 3,max: 16})
            .withMessage('Please enter a valid password.'),
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email.')
    ]
    , authController.signUp);
router.post('/login', authController.signIn);
router.get('/users', isAuth, isAdmin, authController.findUsersForManage);
router.put('/users/manage', isAuth, isAdmin, authController.changeRole);

module.exports = router;
