const {Model} = require('sequelize');
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {

    class Query extends Model {
    }

    Query.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: () => uuid()
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        solved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        }
    }, {sequelize});

    return Query;
};


