const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Furniture = sequelize.define('Furniture', {
    id: {
        type: DataTypes.INTEGER,
        //foreign key
        autoIncrement: true,
        allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    x_position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    y_position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    z_position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = Furniture;