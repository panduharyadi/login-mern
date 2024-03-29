const Sequelize = require('sequelize')
const db = require('../config/Databases')
const Users = require('../models/UsersModel')

const { DataTypes } = Sequelize

const Products = db.define('product', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},
{
    freezeTableName: true,
    timeStamps: true
})

Users.hasMany(Products)
Products.belongsTo(Users, {foreignKey: 'userId'})

module.exports = Products  