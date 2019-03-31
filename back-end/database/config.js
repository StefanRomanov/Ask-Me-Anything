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

db.answer.belongsTo(db.query);
db.answer.belongsTo(db.user);
db.query.belongsTo(db.user);

sequelize.sync()
    .then(() => {
        console.log('Database ready !')
    });

module.exports = db;
