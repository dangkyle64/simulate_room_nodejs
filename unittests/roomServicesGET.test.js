const { getRoomByIdService, getAllRoomsService } = require('../services/roomServices');
const RoomORM = require('../models/roomModel');

jest.mock('../models/roomModel', () => {
    return {
        getAllRooms: jest.fn(),
        getRoomById: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('getAllRoom', () => {
    it('should return all the room with a 200 OK status code', async () => {
        const mockRoomList = [
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

        RoomORM.getAllRooms.mockResolvedValue(mockRoomList);

        const result = await getAllRoomsService();

        expect(result).toEqual(mockRoomList);
    });
});

describe('getRoomByIdService', () => {
    it('should return the room when it exists', async() => {
        const mockRoom =  
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

        RoomORM.getRoomById.mockResolvedValue(mockRoom);

        const result = await getRoomByIdService(0);

        expect(result).toEqual(mockRoom);
    });
});



