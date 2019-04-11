const encryption = require('../util/encryption');
const {Model} = require('sequelize');
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: () => uuid()
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    }, { sequelize });

    User.prototype.authenticate = function(password){
        const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

        return currentHashedPass === this.hashedPassword;
    };

    return User;
};


