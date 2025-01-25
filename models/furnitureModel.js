const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Furniture extends Model {
    
    exampleFunction() {
        return 'this is an example service function'
    };
    
    static async getAllFurnitures() {
        return await this.findAll();
    };



    // more functions here
};

Furniture.init({
    id: {
        type: DataTypes.INTEGER,
        //foreign key
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
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
},
    {
        sequelize,
        modelName: 'Furniture',
    }
);

module.exports = Furniture;