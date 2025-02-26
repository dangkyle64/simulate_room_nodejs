const { deleteFurnitureService  } = require('../services/furnitureServices');
const FurnitureORM = require('../models/furnitureModel');

jest.mock('../models/furnitureModel', () => {
    return {
        deleteFurniture: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('deleteFurnitureByService', () => {
    it('should delete the furniture when given a valid id', async() => {

        FurnitureORM.deleteFurniture.mockResolvedValue({});

        const result = await deleteFurnitureService(0);

        expect(result).toEqual({});
    });
});



