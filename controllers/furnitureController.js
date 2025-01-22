const { getAllFurnituresService, getFurnitureByIdService, addFurnitureService } = require('../services/furnitureServices');

const getAllFurnituresController = (request, response) => {
    const furnitures = getAllFurnituresService();
    response.json(furnitures);
};

const getFurnitureByIdController = (request, response) => {
    const furniture = getFurnitureByIdService(parseInt(request.params.id));

    if (furniture) {
        response.json(furniture);
    } else {
        response.status(404).send({ message: 'Furniture not found'});
    };
};

const addFurnitureController = (request, response) => {
    const newFurniture = request.body;
    const createdFurniture = addFurnitureService(newFurniture);
    response.status(201).json(createdFurniture);
};

module.exports = { getAllFurnituresController, getFurnitureByIdController, addFurnitureController };