const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Room extends Model {
    
    exampleFunction() {
        return 'this is an example service function'
    };
    
    // more functions here
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