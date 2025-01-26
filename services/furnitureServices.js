const { getAllFurnitures, getFurnitureById, addFurniture, updateFurniture, deleteFurniture } = require('../test_database');
const FurnitureORM = require('../models/furnitureModel');

const getAllFurnituresService = () => {
    return FurnitureORM.getAllFurnitures();
};

const getFurnitureByIdService = (id) => {
    return FurnitureORM.getFurnitureById(id);
};

const addFurnitureService = (newFurniture) => {
    return FurnitureORM.addFurniture(newFurniture);
};

const updateFurnitureService = (id, updateData) => {
    return FurnitureORM.updateFurniture(id, updateData);
};

const deleteFurnitureService = (id) => {
    return FurnitureORM.deleteFurniture(id);
};

module.exports = { 
    getAllFurnituresService, 
    getFurnitureByIdService, 
    addFurnitureService, 
    updateFurnitureService, 
    deleteFurnitureService 
};