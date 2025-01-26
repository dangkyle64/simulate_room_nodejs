const { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom } = require('../test_database');
const RoomORM = require('../models/roomModel');
const getAllRoomsService = () => {
    return RoomORM.getAllRooms();
};

const getRoomByIdService = (id) => {
    return RoomORM.getRoomById(id);
};

const addRoomService = (newRoom) => {
    return RoomORM.addRoom(newRoom);
};

const updateRoomService = (id, updateData) => {
    return RoomORM.updateRoom(id, updateData);
};

const deleteRoomService = (id) => {
    return RoomORM.deleteRoom(id);
};

module.exports = { 
    getAllRoomsService, 
    getRoomByIdService, 
    addRoomService, 
    updateRoomService, 
    deleteRoomService 
};