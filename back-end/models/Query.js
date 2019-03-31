const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {

    class Query extends Model {}
    Query.init({
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


