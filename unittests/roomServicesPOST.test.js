const { addRoomService  } = require('../services/roomServices');
const RoomORM = require('../models/roomModel');

jest.mock('../models/roomModel', () => {
    return {
        addRoom: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('postRoomByService', () => {
    it('should return the created room', async() => {

        const mockRoom = { 
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

        RoomORM.addRoom.mockResolvedValue(mockRoom);

        const result = await addRoomService();

        expect(result).toEqual(mockRoom);
    });
});