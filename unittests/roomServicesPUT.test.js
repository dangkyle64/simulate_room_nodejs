const { updateRoomService  } = require('../services/roomServices');
const RoomORM = require('../models/roomModel');

jest.mock('../models/roomModel', () => {
    return {
        updateRoom: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('updateRoomByService', () => {
    it('should return the updated room', async() => {

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

        RoomORM.updateRoom.mockResolvedValue(mockUpdateData);

        const result = await updateRoomService(1, mockUpdateData);

        expect(result).toEqual(mockUpdateData);
    });
});