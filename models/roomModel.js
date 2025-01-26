const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Room extends Model {
    
    static async getAllRooms() {
        return await this.findAll();
    };

    static async getRoomById(id) {
        return await this.findByPk(id);
    };

    static async addRoom(newRoom) {
        return await this.create(newRoom);
    };

    static async updateRoom(id, updateData) {
        let selectedRoom = await this.findByPk(id);

        if (!selectedRoom) {
            throw new Error('Room not found');
        }
        return await selectedRoom.update(updateData);
    };

    static async deleteRoom(id) {
        let selectedRoom = await this.findByPk(id);

        if (!selectedRoom) {
            throw new Error('Room not found');
        }
        return await selectedRoom.destroy();
    };
};

Room.init({
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
},
    {
        sequelize,
        modelName: 'Room',
    }
);

module.exports = Room;