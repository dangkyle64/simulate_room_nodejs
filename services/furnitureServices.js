const { getAllFurnitures, getFurnitureById, addFurniture } = require('../test_database');

const getAllFurnituresService = () => {
    return getAllFurnitures();
};

const getFurnitureByIdService = (id) => {
    return getFurnitureById(id);
};

const addFurnitureService = () => {
    return addFurniture();
};

module.exports = { getAllFurnituresService, getFurnitureByIdService, addFurnitureService };