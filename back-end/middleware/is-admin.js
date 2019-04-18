module.exports = (req, res, next) => {
    console.error(req.role);
    if (req.role !== 'ADMIN' && req.role !=='ROOT') {
        const error = new Error('Unauthorized. Only admins allowed !');
        error.statusCode = 401;
        throw error;
    }
    next();
};
