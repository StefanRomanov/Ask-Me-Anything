const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class QueryLikes extends Model {
    }

    QueryLikes.init({}, {
        tableName: 'query_likes',
        sequelize
    });

    return QueryLikes;
};
