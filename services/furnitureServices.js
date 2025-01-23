const { getAllFurnitures, getFurnitureById, addFurniture, deleteFurniture } = require('../test_database');

const getAllFurnituresService = () => {
    return getAllFurnitures();
};

const getFurnitureByIdService = (id) => {
    return getFurnitureById(id);
};

const addFurnitureService = (newFurniture) => {
    return addFurniture(newFurniture);
};

const deleteFurnitureService = (id) => {
    return deleteFurniture(id);
};

module.exports = { getAllFurnituresService, getFurnitureByIdService, addFurnitureService, deleteFurnitureService };