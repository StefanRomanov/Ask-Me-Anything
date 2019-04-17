module.exports = (req, res, next) => {
    if (req.role) {
        const error = new Error('Unauthorized. Only admins allowed !');
        error.statusCode = 401;
        throw error;
    }
    next();
};
