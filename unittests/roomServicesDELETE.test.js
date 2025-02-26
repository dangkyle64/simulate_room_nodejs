const { deleteRoomService  } = require('../services/roomServices');
const RoomORM = require('../models/roomModel');

jest.mock('../models/roomModel', () => {
    return {
        deleteRoom: jest.fn(),
        findByPk: jest.fn()
    };
});

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('deleteRoomByService', () => {
    it('should delete the room when given a valid id', async() => {

        RoomORM.deleteRoom.mockResolvedValue({});

        const result = await deleteRoomService(0);

        expect(result).toEqual({});
    });
});



