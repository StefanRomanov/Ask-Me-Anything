const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {

    class Query extends Model {}
    Query.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        score: DataTypes.INTEGER,
        tags: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('tags').split(';')
            },
            set(tags) {
                this.setDataValue('tags',tags.join(';'));
            },
        }
    }, { sequelize });



    return Query;
};


