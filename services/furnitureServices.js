const { getAllFurnitures, getFurnitureById, addFurniture, updateFurniture, deleteFurniture } = require('../test_database');
const FurnitureORM = require('../models/furnitureModel');

const getAllFurnituresService = () => {
    return FurnitureORM.getAllFurnitures();
};

const getFurnitureByIdService = (id) => {
    return getFurnitureById(id);
};

const addFurnitureService = (newFurniture) => {
    return addFurniture(newFurniture);
};

const updateFurnitureService = (id, updateData) => {
    return updateFurniture(id, updateData);
};

const deleteFurnitureService = (id) => {
    return deleteFurniture(id);
};

module.exports = { 
    getAllFurnituresService, 
    getFurnitureByIdService, 
    addFurnitureService, 
    updateFurnitureService, 
    deleteFurnitureService 
};