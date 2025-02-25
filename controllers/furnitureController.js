const { getAllFurnituresService, getFurnitureByIdService, addFurnitureService, deleteFurnitureService, updateFurnitureService } = require('../services/furnitureServices');
const { handleError } = require('../utils/errorHandler');
const { handleInitialValidation } = require('../utils/initialValidationHandler');
const { handlePOSTValidation } = require('../utils/postValidationHandler');

const getAllFurnituresController = async (request, response) => {
    try {
        const furnitures = await getAllFurnituresService();
        return response.status(200).json(furnitures);
    } catch(error) {
        handleError(error, response);
    };
};

const getFurnitureByIdController = async (request, response) => {

    try {

        handleInitialValidation(request, response);

        const furniture = await getFurnitureByIdService(parseInt(request.params.id));

        if (!furniture) {
            throw new Error('404 Not Found'); 
        };

        return response.status(200).json(furniture);

    } catch(error) {
        handleError(error, response);
    };
};

const addFurnitureController = async (request, response) => {
    const newFurniture = request.body;

    handlePOSTValidation(request, response);
    try {
        const createdFurniture = await addFurnitureService(newFurniture);
        response.status(201).json(createdFurniture);
    } catch(error) {
        response.status(500).json({ error: 'Error creating furniture '});
    };
};

const updateFurnitureController = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const updateData = request.body;

        const updatedFurniture = await updateFurnitureService(id, updateData);

        return response.status(200).json({ 
            message: 'Furniture successfully updated', 
            updateFurniture: updatedFurniture.toJSON()
        });
    } catch (error) {
        return response.status(404).json({ message: 'Furniture not found' });
    }
};


const deleteFurnitureController = async (request, response) => {
    try {

        handleInitialValidation(request, response);

        const furniture = await deleteFurnitureService(parseInt(request.params.id));
            
        if (!furniture) {
            throw new Error('404 Not Found'); 
        };

        return response.status(204);

    } catch(error) {
        handleError(error, response);
    };
};

module.exports = { 
    getAllFurnituresController, 
    getFurnitureByIdController, 
    addFurnitureController, 
    updateFurnitureController, 
    deleteFurnitureController 
};