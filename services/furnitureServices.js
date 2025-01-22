const { getAllFurnitures, getFurnitureById, addFurniture } = require('../test_database');

const getAllFurnituresService = () => {
    return getAllFurnitures();
};

const getFurnitureByIdService = (id) => {
    return getFurnitureById(id);
};

const addFurnitureService = (newFurniture) => {
    return addFurniture(newFurniture);
};

module.exports = { getAllFurnituresService, getFurnitureByIdService, addFurnitureService };