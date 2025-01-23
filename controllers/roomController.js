const { getAllRoomsService, getRoomByIdService, addRoomService } = require('../services/roomServices');

const getAllRoomsController = (request, response) => {
    const rooms = getAllRoomsService();
    response.json(rooms);
};

const getRoomByIdController = async (request, response) => {

    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new Error('Invalid ID input inside of roomByIdController');
        };

        const room = getRoomByIdService(id);

        if (room) {
            response.json(room);
        } else {
            response.status(404).send({ message: 'Room not found'});
        };
    } catch(error) {
        response.status(404).send({ message: 'Room not found'});
    };
};

const addRoomController = (request, response) => {
    const newRoom = request.body;

    if (!newRoom.length || !Number.isInteger(newRoom.length) || newRoom.length < 0) {
        return response.status(400).json({ error: 'Room length is required and must be a positive integer' });
    };

    if (!newRoom.width || !Number.isInteger(newRoom.width) || newRoom.width < 0) {
        return response.status(400).json({ error: 'Room width is required and must be a positive integer' });
    };

    if (!newRoom.height || !Number.isInteger(newRoom.height) || newRoom.height < 0) {
        return response.status(400).json({ error: 'Room height is required and must be a positive integer' });
    };

    const createdRoom = addRoomService(newRoom);
    response.status(201).json(createdRoom);
};

module.exports = { getAllRoomsController, getRoomByIdController, addRoomController };