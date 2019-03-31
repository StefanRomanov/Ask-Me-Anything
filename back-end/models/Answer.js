const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {}

    Answer.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    }, { sequelize });

    return Answer;
};
