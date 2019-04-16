const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeaders = req.get('Authorization');

    if(authHeaders) {
        const token = req.get('Authorization').split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'somesupersecret')
        } catch(error) {
            // Ignored
        }

        if (decodedToken) {
            req.role = decodedToken.role;
            req.userId = decodedToken.userId;
        }
    }

    next();
};
