const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class AnswerDislikes extends Model {
    }

    AnswerDislikes.init({}, {
        tableName: 'answer_dislikes',
        sequelize
    });

    return AnswerDislikes;
};
