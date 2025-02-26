const { updateRoomService } = require('../services/roomServices');
const { updateRoomController } = require('../controllers/roomController');

jest.mock('../services/roomServices', () => ({
    updateRoomService: jest.fn()
}));

beforeEach(() => {
    jest.clearAllMocks(); 
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('PUT /api/room/:id', () => {
    it('should update the room, returning back the updated data, message of success, and the 200 OK status message', async () => {

        updateRoomService.mockResolvedValue({ id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0, toJSON: jest.fn().mockReturnValue({ id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 })});

        const request = {
            params: { id: '1' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 },
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await updateRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            message: 'Room successfully updated',
            updateRoom: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        });
    });
});
