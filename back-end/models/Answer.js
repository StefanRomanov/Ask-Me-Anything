const {Model} = require('sequelize');
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {}

    Answer.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuid()
        },
        content: {
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
