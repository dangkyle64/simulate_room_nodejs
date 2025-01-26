const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Furniture extends Model {

    static async getAllFurnitures() {
        return await this.findAll();
    };

    static async getFurnitureById(id) {
        return await this.findByPk(id);
    };

    static async addFurniture(newFurniture) {
        return await this.create(newFurniture);
    };

    static async updateFurniture(id, updateData) {
        let selectedFurniture = await this.findByPk(id);

        if (!selectedFurniture) {
            throw new Error('Furniture not found');
        }
        return await selectedFurniture.update(updateData);
    };

    static async deleteFurniture(id) {
        let selectedFurniture = await this.findByPk(id);

        if (!selectedFurniture) {
            throw new Error('Furniture not found');
        }
        return await selectedFurniture.destroy();
    };
};

Furniture.init({
    id: {
        type: DataTypes.INTEGER,
        //foreign key
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
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