const { addFurnitureService  } = require('../services/furnitureServices');
const FurnitureORM = require('../models/furnitureModel');

jest.mock('../models/furnitureModel', () => {
    return {
        addFurniture: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('postFurnitureByService', () => {
    it('should return the created furniture', async() => {

        const mockFurniture = { 
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
        }

        FurnitureORM.addFurniture.mockResolvedValue(mockFurniture);

        const result = await addFurnitureService();

        expect(result).toEqual(mockFurniture);
    });
});