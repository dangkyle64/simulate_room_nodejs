const { getAllFurnituresService, getFurnitureByIdService, addFurnitureService, deleteFurnitureService, updateFurnitureService } = require('../services/furnitureServices');
const { handleError } = require('../utils/errorHandler');
const { handleInitialValidation } = require('../utils/initialValidationHandler');
const { handleFurniturePOSTValidation, handleFurniturePUTValidation } = require('../utils/furniturePOSTPUTValidationHandler');

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
            throw Error('404 Not Found: Furniture not found'); 
        };

        return response.status(200).json(furniture);

    } catch(error) {
        handleError(error, response);
    };
};

const addFurnitureController = async (request, response) => {
    const newFurniture = request.body;
   
    try {
        handleFurniturePOSTValidation(request, response);

        const createdFurniture = await addFurnitureService(newFurniture);
        response.status(201).json(createdFurniture);
    } catch(error) {
        handleError(error, response);
    };
};

const updateFurnitureController = async (request, response) => {

    try {
        handleFurniturePUTValidation(request, response);

        const id = parseInt(request.params.id);
        const updateData = request.body;

        const updatedFurniture = await updateFurnitureService(id, updateData);

        return response.status(200).json({ 
            message: 'Furniture successfully updated', 
            updateFurniture: updatedFurniture.toJSON()
        });
    } catch (error) {
        handleError(error, response);
    }
};


const deleteFurnitureController = async (request, response) => {
    try {

        handleInitialValidation(request, response);

        const furniture = await deleteFurnitureService(parseInt(request.params.id));
            
        if (!furniture) {
            throw Error('404 Not Found: Furniture not found'); 
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