const { getAllFurnituresService, getFurnitureByIdService, addFurnitureService, deleteFurnitureService, updateFurnitureService } = require('../services/furnitureServices');

const getAllFurnituresController = (request, response) => {
    const furnitures = getAllFurnituresService();
    response.json(furnitures);
};

const getFurnitureByIdController = async (request, response) => {

    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new Error('Invalid ID input inside of furnitureByIdController');
        };

        const furniture = getFurnitureByIdService(id);

        if (furniture) {
            response.json(furniture);
        } else {
            response.status(404).send({ message: 'Furniture not found'});
        };

    } catch(error) {
        response.status(404).send({ message: 'Furniture not found'});
    };
};

// for tests null value, extreme small or large numbers
const addFurnitureController = (request, response) => {
    const newFurniture = request.body;

    if (!newFurniture.type || typeof newFurniture.type !== 'string') {
        return response.status(400).json({ error: 'Furniture type is required and must be a string.' });
    };

    if (!newFurniture.length || !Number.isInteger(newFurniture.length) || newFurniture.length < 0) {
        return response.status(400).json({ error: 'Furniture length is required and must be a positive integer' });
    };

    if (!newFurniture.width || !Number.isInteger(newFurniture.width) || newFurniture.width < 0) {
        return response.status(400).json({ error: 'Furniture width is required and must be a positive integer' });
    };

    if (!newFurniture.height || !Number.isInteger(newFurniture.height) || newFurniture.height < 0) {
        return response.status(400).json({ error: 'Furniture height is required and must be a positive integer' });
    };

    const createdFurniture = addFurnitureService(newFurniture);
    response.status(201).json(createdFurniture);
};

const updateFurnitureController = async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new Error('Invalid ID input inside of deleteFurnitureController');
        };

        const furniture = getFurnitureByIdService(id);

        if (furniture) {
            let updateData = response.body;
            updateFurnitureService(id, updateData);
            
            response.status(200).send({ message: 'Furniture successfully updated' });
        };

    } catch(error) {
        response.status(404).send({ message: 'Furniture not found'});
    };
};

const deleteFurnitureController = async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new Error('Invalid ID input inside of deleteFurnitureController');
        };

        const furniture = deleteFurnitureService(id);

        if (furniture) {
            response.status(204).send({ message: 'Furniture successfully deleted' });
        } else {
            throw new Error('Furniture not found');
        };

    } catch(error) {
        response.status(404).send({ message: 'Furniture not found'});
    };
};

module.exports = { getAllFurnituresController, getFurnitureByIdController, addFurnitureController, updateFurnitureController, deleteFurnitureController };