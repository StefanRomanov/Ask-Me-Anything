const db = require('../database/config');
const encryption = require('../util/encryption');

class UserService {

    constructor() {

    }

    createUser(username, email, password) {

        let role = 'USER';

        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, password);

        return db.user.count()
            .then(
            result => {
                if(result === 0){
                    role = 'ADMIN';
                }
                return db.user.create({
                    username,
                    email,
                    salt,
                    role,
                    hashedPassword
                })
            })

    }

    findUserByUsername(username) {
        return db.user.findOne({where: {username: username}});
    }

    findUserById(id) {
        return db.user.findOne({where: {id: id}});
    }

    increaseScore(id, amount) {
        return db.user.increment(
            'score',
            {
                by: amount,
                where: {
                    id: id
                }
            }
        )
    }

    decreaseScore(id, amount) {
        return db.user.decrement(
            'score',
            {
                by: amount,
                where: {
                    id: id
                }
            }
        )
    }
}

module.exports = () => {
    return new UserService();
};
