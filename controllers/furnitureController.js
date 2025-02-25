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

    //console.log('------------------------------------------------------Updating Furniture:', request.body);
    //console.log('------------------------------------------------------Furniture ID:', request.params.id);
    
    try {
        const id = parseInt(request.params.id);
        
        if (isNaN(id)) {
            return response.status(400).send({ message: 'Invalid ID input' });
        };

        const furniture = await getFurnitureByIdService(id);
        console.log('Fetched furniture:', furniture);

        if (furniture) {
            let updateData = request.body;

            if (typeof updateData.type !== 'string' || !updateData.type) {
                return response.status(400).json({ error: 'Furniture type must be a non-empty string.' });
            };

            if (!Number.isInteger(updateData.length) || updateData.length < 0) {
                return response.status(400).json({ error: 'Furniture length update must be a valid positive integer' });
            };

            if (!Number.isInteger(updateData.width) || updateData.width < 0) {
                return response.status(400).json({ error: 'Furniture width update must be a valid positive integer' });
            };

            if (!Number.isInteger(updateData.height) || updateData.height < 0) {
                return response.status(400).json({ error: 'Furniture height update must be a valid positive integer' });
            };

            const updatedFurniture = await updateFurnitureService(id, updateData);
            
            return response.status(200).send({ 
                message: 'Furniture successfully updated', 
                updateFurniture: updatedFurniture.toJSON()
            });
        } else {
            throw Error('Furniture does not exist');
        };

    } catch(error) {
        return response.status(404).send({ message: 'Furniture not found'});
    };
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