const { getFurnitureByIdService, getAllFurnituresService } = require('../services/furnitureServices');
const FurnitureORM = require('../models/furnitureModel');

jest.mock('../models/furnitureModel', () => {
    return {
        getAllFurnitures: jest.fn(),
        getFurnitureById: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('getAllFurniture', () => {
    it('should return all the furniture with a 200 OK status code', async () => {
        const mockFurnitureList = [
            { 
                id: 0, 
                type: "Sofa", 
                modelUrl: "https://example.com/sofa-model", 
                length: 20, 
                width: 9, 
                height: 8, 
                x_position: 10, 
                y_position: 5, 
                z_position: 0, 
                rotation_x: 0, 
                rotation_y: 45, 
                rotation_z: 0 
            }, 
            { 
                id: 1, 
                type: "Coffee Table", 
                modelUrl: "https://example.com/coffee-table-model", 
                length: 12, 
                width: 6, 
                height: 4, 
                x_position: 15, 
                y_position: 8, 
                z_position: 0, 
                rotation_x: 0, 
                rotation_y: 0, 
                rotation_z: 0 
            }
        ];

        FurnitureORM.getAllFurnitures.mockResolvedValue(mockFurnitureList);

        const result = await getAllFurnituresService();

        expect(result).toEqual(mockFurnitureList);
    });
});

describe('getFurnitureByIdService', () => {
    it('should return the furniture when it exists', async() => {
        const mockFurniture =  
        { 
            id: 0, 
            type: "Sofa", 
            modelUrl: "https://example.com/sofa-model", 
            length: 20, 
            width: 9, 
            height: 8, 
            x_position: 10, 
            y_position: 5, 
            z_position: 0,
            rotation_x: 0, 
            rotation_y: 45, 
            rotation_z: 0 
        };

        FurnitureORM.getFurnitureById.mockResolvedValue(mockFurniture);

        const result = await getFurnitureByIdService(0);

        expect(result).toEqual(mockFurniture);
    });
});



