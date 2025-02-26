const { updateFurnitureService  } = require('../services/furnitureServices');
const FurnitureORM = require('../models/furnitureModel');

jest.mock('../models/furnitureModel', () => {
    return {
        updateFurniture: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('updateFurnitureByService', () => {
    it('should return the updated furniture', async() => {

        const mockUpdateData = { 
            id: 0, 
            type: "SofaUpdated", 
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

        FurnitureORM.updateFurniture.mockResolvedValue(mockUpdateData);

        const result = await updateFurnitureService(1, mockUpdateData);

        expect(result).toEqual(mockUpdateData);
    });
});