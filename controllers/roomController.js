const { getAllRoomsService, getRoomByIdService, addRoomService } = require('../services/roomServices');

const getAllRoomsController = (request, response) => {
    const rooms = getAllRoomsService();
    response.json(rooms);
};

const getRoomByIdController = (request, response) => {
    const room = getRoomByIdService(parseInt(request.params.id));

    if (room) {
        response.json(room);
    } else {
        response.status(404).send({ message: 'Room not found'});
    };
};

const addRoomController = (request, response) => {
    const newRoom = request.body;
    const createdRoom = addRoomService(newRoom);
    response.status(201).json(createdRoom);
};

module.exports = { getAllRoomsController, getRoomByIdController, addRoomController };