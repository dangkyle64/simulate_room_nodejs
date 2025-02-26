const { getAllRoomsService, getRoomByIdService, addRoomService, updateRoomService, deleteRoomService } = require('../services/roomServices');
const { handleError } = require('../utils/errorHandler');
const { handleInitialValidation } = require('../utils/initialValidationHandler');
const { handleRoomPOSTValidation, handleRoomPUTValidation } = require('../utils/roomPOSTPUTValidationHandler');
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

        handleRoomPOSTValidation(request, response);

        const newRoom = request.body;
    
        const createdRoom = await addRoomService(newRoom);
        response.status(201).json(createdRoom);
    } catch(error) {
        handleError(error, response);
    };
};

const updateRoomController = async (request, response) => {
    try {

        handleRoomPUTValidation(request, response);

        const updateData = request.body;

        const updatedRoom = await updateRoomService(parseInt(request.params.id), updateData);
            
        return response.status(200).json({ 
            message: 'Room successfully updated', 
            updateRoom: updatedRoom.toJSON()
        });

    } catch(error) {
        handleError(error, response);
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