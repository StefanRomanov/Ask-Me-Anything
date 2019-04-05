const {Sequelize} = require('sequelize');

const db = {};

const sequelize = new Sequelize('angular_project', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.query = require('../models/Query')(sequelize, Sequelize);
db.user = require('../models/User')(sequelize, Sequelize);
db.answer = require('../models/Answer')(sequelize,Sequelize);
db.answer_likes = require('../models/AnswerLikes')(sequelize,Sequelize);
db.answer_dislikes = require('../models/AnswerDislikes')(sequelize,Sequelize);
db.query_likes = require('../models/QueryLikes')(sequelize,Sequelize);
db.query_dislikes = require('../models/QueryDislikes')(sequelize,Sequelize);

db.query.hasMany(db.answer,{ onDelete: 'cascade' });
db.user.hasMany(db.answer);
db.user.hasOne(db.query);
db.answer.belongsToMany(db.user, {
    through: {
        model: db.answer_dislikes,
        unique: false,
    },
    foreignKey: 'answerId',
    constraints: false
});
db.user.belongsToMany(db.answer,{
    through: {
        model: db.answer_dislikes,
        unique: false,
    },
    foreignKey: 'userId',
    constraints: false
});
db.query.belongsToMany(db.user,{
    through: {
        model: db.query_dislikes,
        unique: false,
    },
    foreignKey: 'queryId',
    constraints: false
});
db.user.belongsToMany(db.query,{
    through: {
        model: db.query_dislikes,
        unique: false,
    },
    foreignKey: 'userId',
    constraints: false
});

db.answer.belongsToMany(db.user, {
    through: {
        model: db.answer_likes,
        unique: false,
    },
    foreignKey: 'answerId',
    constraints: false
});
db.user.belongsToMany(db.answer,{
    through: {
        model: db.answer_likes,
        unique: false,
    },
    foreignKey: 'userId',
    constraints: false
});
db.query.belongsToMany(db.user,{
    through: {
        model: db.query_likes,
        unique: false,
    },
    foreignKey: 'queryId',
    constraints: false
});
db.user.belongsToMany(db.query,{
    through: {
        model: db.query_likes,
        unique: false,
    },
    foreignKey: 'userId',
    constraints: false
});


sequelize.sync()
    .then(() => {
        console.log('Database ready !')
    });

module.exports = db;
