const { getAllRooms, getRoomById, addRoom } = require('../test_database');

const getAllRoomsService = () => {
    return getAllRooms();
};

const getRoomByIdService = (id) => {
    return getRoomById(id);
};

const addRoomService = () => {
    return addRoom();
};

module.exports = { getAllRoomsService, getRoomByIdService, addRoomService };