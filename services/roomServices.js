const { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom } = require('../test_database');

const getAllRoomsService = () => {
    return getAllRooms();
};

const getRoomByIdService = (id) => {
    return getRoomById(id);
};

const addRoomService = (newRoom) => {
    return addRoom(newRoom);
};

const updateRoomService = (id, updateData) => {
    return updateRoom(id, updateData);
};

const deleteRoomService = (id) => {
    return deleteRoom(id);
};

module.exports = { 
    getAllRoomsService, 
    getRoomByIdService, 
    addRoomService, 
    updateRoomService, 
    deleteRoomService 
};