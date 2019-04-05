const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class QueryDislikes extends Model {
    }

    QueryDislikes.init({}, {
        tableName: 'query_dislikes',
        sequelize
    });

    return QueryDislikes;
};
