const UserService = require("./user-service");

const db = require('../database/config');

module.exports = {
    findAll: () => {
        return db.query.findAll();
    },
    findOneById: (id) => {
        return db.query.findOne({where: {id: id}})
    },
    increaseScore: (id) => {
        return db.query.increment(
            'score',
            {
                where: {
                    id: id
                }
            }
        )
    },
    decreaseScore: (id) => {
        return db.query.decrement(
            'score',
            {
                where: {
                    id: id
                }
            }
        )
    },

    findByTitleContains: (title) => {
        return db.query.findAll({
            where: {
                title: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('asset_name')), 'LIKE', '%' + title + '%')
            }
        })
    },

    findByTags: (tags) => {
        return db.query.findAll({
            where: {
                tags: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('asset_name')), 'LIKE', '%' + title + '%')
            }
        })
    },

    createQuery(title, description, tags, username) {
        return UserService.findUserByUsername(username)
            .then(user => {
                db.query.create({
                    title
                    , description
                    , tags
                }).then((query) => {
                    query.setUser(user);
                })
            })
    }
};
