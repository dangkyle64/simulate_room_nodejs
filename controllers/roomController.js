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

const updateRoomController = async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new Error('Invalid ID input inside of updateRoomController');
        };

        const room = getRoomByIdService(id);

        if (room) {
            let updateData = request.body;

            if (!Number.isInteger(updateData.length) || updateData.length < 0) {
                return response.status(400).json({ error: 'Room length update must be a valid positive integer' });
            };

            if (!Number.isInteger(updateData.width) || updateData.width < 0) {
                return response.status(400).json({ error: 'Room width update must be a valid positive integer' });
            };

            if (!Number.isInteger(updateData.height) || updateData.height < 0) {
                return response.status(400).json({ error: 'Room height update must be a valid positive integer' });
            };

            updateRoomService(id, updateData);
            
            response.status(200).send({ message: 'Room successfully updated' });
        };

    } catch(error) {
        response.status(404).send({ message: 'Room not found'});
    };
};

const deleteRoomController = async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new Error('Invalid ID input inside of deleteRoomController');
        };

        const room = deleteRoomService(id);

        if (room) {
            response.status(204).send({ message: 'Room successfully deleted' });
        } else {
            throw new Error('Room not found');
        };

    } catch(error) {
        response.status(404).send({ message: 'Room not found'});
    };
};

module.exports = { 
    getAllRoomsController, 
    getRoomByIdController, 
    addRoomController,
    updateRoomController,
    deleteRoomController
};