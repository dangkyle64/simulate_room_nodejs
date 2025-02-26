const { getAllRoomsService, getRoomByIdService, addRoomService, updateRoomService, deleteRoomService } = require('../services/roomServices');
const { handleError } = require('../utils/errorHandler');
const { handleInitialValidation } = require('../utils/initialValidationHandler');

const getAllRoomsController = async (request, response) => {
    try {
        const rooms = await getAllRoomsService();
        response.status(200).json(rooms);
    } catch(error) {
        handleError(error, response);
    };
};

const getRoomByIdController = async (request, response) => {

    try {
        handleInitialValidation(request, response);

        const room = await getRoomByIdService(parseInt(request.params.id));

        if (!room) {
            throw Error('404 Not Found: Room not found'); 
        };

        response.status(200).json(room);
 
    } catch(error) {
        handleError(error, response);
    };
};

const addRoomController = async (request, response) => {

    try {

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
    
        const createdRoom = await addRoomService(newRoom);
        response.status(201).json(createdRoom);
    } catch(error) {
        response.status(500).json({ error: 'Error creating room' });
    };
};

const updateRoomController = async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new Error('Invalid ID input inside of updateRoomController');
        };

        const room = await getRoomByIdService(id);

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

            await updateRoomService(id, updateData);
            
            response.status(200).json({ message: 'Room successfully updated' });
        };

    } catch(error) {
        response.status(404).json({ message: 'Room not found'});
    };
};

const deleteRoomController = async (request, response) => {
    try {
        handleInitialValidation(request, response);

        const room = await deleteRoomService(parseInt(request.params.id));

        if (!room) {
            throw Error('404 Not Found: Room not found'); 
        };

        return response.status(204);

    } catch(error) {
        handleError(error, response);
    };
};

module.exports = { 
    getAllRoomsController, 
    getRoomByIdController, 
    addRoomController,
    updateRoomController,
    deleteRoomController
};