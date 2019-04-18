const validateUser = require('../util/validateCreation');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user-service');

const userService = UserService();

module.exports = {
    signUp: (req, res, next) => {
        if (validateUser(req, res)) {
            const {username, email, password} = req.body;

            userService.createUser(
                username,
                email,
                password
            ).then((user) => {
                res.status(201)
                    .json({message: 'Successful register!', userId: user._id});
            })
                .catch((error) => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                });
        }
    },
    signIn: (req, res, next) => {
        const {username, password} = req.body;

        userService.findUserByUsername(username)
            .then((user) => {
                if (!user) {
                    const error = new Error('A user with this username could not be found');
                    error.statusCode = 401;
                    throw error;
                }

                if (!user.authenticate(password)) {
                    const error = new Error('A user with this username could not be found');
                    error.statusCode = 401;
                    throw error;
                }

                const token = jwt.sign({
                        username: user.username,
                        role: user.role,
                        userId: user.id.toString()
                    }
                    , 'somesupersecret'
                    , {expiresIn: '1h'});

                res.status(200).json(
                    {
                        message: 'User successfully logged in!',
                        token,
                        username: user.username,
                        userId: user.id.toString()
                    });
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    changeRole(req, res, next){
        const {role, userId} = req.body;

        userService.changeRole(userId,role)
            .then(result => {
                res.status(200)
                    .json({message: 'Role changed', success: true});
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },

    findUsersForManage(req, res, next) {
        const userId = req.userId;
        const username = req.query.username;
        const page = req.query.page;

        userService.findUsersForRoleManage(userId, username, page)
            .then(result => {
                res
                    .status(200)
                    .json({
                        message: `${result.count} users found`,
                        success: true,
                        users: result.rows,
                        count: result.count
                    })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    }
};
