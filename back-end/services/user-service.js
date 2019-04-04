const db = require('../database/config');
const encryption = require('../util/encryption');

module.exports = {
    createUser: (username, email, password) => {

        console.log(password);
        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, password);

        return db.user.create({
            username,
            email,
            salt,
            hashedPassword
        })
    },

    findUserByUsername: (username) => {
        return db.user.findOne({where: {username: username}});
    },

    increaseScore: (username) => {
        return db.user.increment(
            'score',
            {
                where: {
                    username: username
                }
            }
        )
    },

    decreaseScore: (username) => {
        return db.user.decrement(
            'score',
            {
                where: {
                    username: username
                }
            }
        )
    }
};
