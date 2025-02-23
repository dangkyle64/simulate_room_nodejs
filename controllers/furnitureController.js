const { getAllFurnituresService, getFurnitureByIdService, addFurnitureService, deleteFurnitureService, updateFurnitureService } = require('../services/furnitureServices');

const getAllFurnituresController = async (request, response) => {
    try {
        const furnitures = await getAllFurnituresService();
        return response.json(furnitures);
    } catch(error) {
        return response.status(500).json({ message: 'Error fetching furniture data' });
    };
};

const getFurnitureByIdController = async (request, response) => {

    try {

        const contentType = request.get('Content-Type');
        if (contentType && contentType !== 'application/json') {
            return response.status(415).send({ message: 'Unsupported media type' });
        };

        const id = parseInt(request.params.id);

        const leadingZeroRegex = /^0\d+/;  // Matches any string that starts with a 0 followed by more digits.
        const invalidCharacterRegex = /[^\d]/;

        if (isNaN(id) || id < 0 || leadingZeroRegex.test(request.params.id) || invalidCharacterRegex.test(request.params.id)) {
            return response.status(400).send({ message: 'Invalid ID input' });
        };

        const furniture = await getFurnitureByIdService(id);

        if (furniture) {
            return response.status(200).json(furniture);
        } else {
            return response.status(404).send({ message: 'Furniture not found'});
        };

    } catch(error) {
        return response.status(404).send({ message: 'Furniture not found'});
    };
};

// for tests null value, extreme small or large numbers
const addFurnitureController = async (request, response) => {
    const newFurniture = request.body;

    try {
        if (!newFurniture.type || typeof newFurniture.type !== 'string' || !newFurniture.type.trim()) {
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

            if (typeof updateData.type !== 'string') {
                return response.status(400).json({ error: 'Furniture type update must be a string.' });
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
        const id = parseInt(request.params.id);

        const leadingZeroRegex = /^0\d+/;
        const invalidCharacterRegex = /[^\d]/;

        if (isNaN(id) ||leadingZeroRegex.test(request.params.id) || invalidCharacterRegex.test(request.params.id)) {
            return response.status(400).send({ message: 'Invalid ID input' });
        };

        const invalidSymbolRegex =  /[^0-9]/;;
        if (invalidSymbolRegex.test(id)) {
            return response.status(400).send({ message: 'Invalid ID input' });
        };

        const furniture = await deleteFurnitureService(id);

        if (furniture) {
            return response.status(200).send({ message: 'Furniture deleted successfully' });
        } else {
            return response.status(404).send({ message: 'Furniture not found'});
        };

    } catch(error) {
        return response.status(404).send({ message: 'Furniture not found'});
    };
};

module.exports = { 
    getAllFurnituresController, 
    getFurnitureByIdController, 
    addFurnitureController, 
    updateFurnitureController, 
    deleteFurnitureController 
};