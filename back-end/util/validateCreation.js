const {validationResult} = require('express-validator/check');


module.exports = function validateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        });
        return false;
    }
    return true;
}
