module.exports = (req, res, next) => {
    if (req.role !== 'USER') {
        const error = new Error('Unauthorized. Only users allowed !');
        error.statusCode = 401;
        throw error;
    }
    next();
};
