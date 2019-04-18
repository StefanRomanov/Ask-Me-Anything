const encryption = require('../util/encryption');
const db = require('../database/config');
const paginator = require('../util/pagination');

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
                    role = 'ROOT';
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

    findUsersForRoleManage(userId, username, page){
        return db.user.findAndCountAll({
            where: {
                username: {
                  [db.Sequelize.Op.substring]  : username
                },
                id: {
                    [db.Sequelize.Op.not] : userId
                },
                role: {
                    [db.Sequelize.Op.not] : 'ROOT'
                }
            },
            attributes: ['id','username', 'email' ,'role'],
            ...paginator(page, 5)
        })
    }

    changeRole(userId, role){
        return db.user.findOne({
            where: {id: userId}
        }).then(user => {
            if(!user){
                const error = new Error('User not found !');
                error.statusCode = 404;
                throw error;
            }
            if(user.role === 'ROOT'){
                const error = new Error('Cannot change role of root admin !');
                error.statusCode = 403;
                throw error;
            }

            return db.user.update({role: role},
                {
                    where: {id: userId}
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
