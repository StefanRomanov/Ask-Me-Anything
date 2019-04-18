const jwt = require('jsonwebtoken');
const UserService = require('../services/user-service');

const userService = UserService();

module.exports = (req, res, next) => {
    const authHeaders = req.get('Authorization');
    if (!authHeaders) {
        return res.status(401)
            .json({message: 'Not authenticated.'})
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecret')
    } catch (error) {
        return res.status(410)
            .json({message: 'Session expired.', error});
    }

    if (!decodedToken) {
        return res.status(401)
            .json({message: 'Not authenticated.'});
    }

    userService.findUserById(decodedToken.userId)
        .then(user => {
            if(!user || user.role !== decodedToken.role){
                return res.status(410)
                    .json({message: 'Session expired.',reason: 'Role changed'});
            }

            req.role = decodedToken.role;
            req.userId = decodedToken.userId;
            next();
        })
        .catch(error => {
            next(error);
        })
};
