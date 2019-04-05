const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class AnswerLikes extends Model {
    }

    AnswerLikes.init({}, {
        tableName: 'answer_likes',
        sequelize
    });

    return AnswerLikes;
};
