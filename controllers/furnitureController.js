const { getAllFurnituresService, getFurnitureByIdService, addFurnitureService } = require('../services/furnitureServices');

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

// for tests int for type, string for length, null value, empty values, extreme small or large numbers
const addFurnitureController = (request, response) => {
    const newFurniture = request.body;

    if (!newFurniture.type || typeof newFurniture.type !== 'string') {
        console.log('Returning 400 because type is invalid');
        return response.status(400).json({ error: 'Furniture type is required and must be a string.' });
    };

    const createdFurniture = addFurnitureService(newFurniture);
    response.status(201).json(createdFurniture);
};

module.exports = { getAllFurnituresController, getFurnitureByIdController, addFurnitureController };