module.exports = (req, res, next) => {
    if (req.role) {
        return res.status(401)
            .json({ message: 'Unauthorized. Page restricted to non admins !' })
    }
    next();
};
