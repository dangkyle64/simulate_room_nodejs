const { getAllRoomsController, getRoomByIdController } = require('../controllers/roomController');
const { getAllRoomsService, getRoomByIdService } = require('../services/roomServices');

jest.mock('../services/roomServices', () => ({
    getRoomByIdService: jest.fn(),
    getAllRoomsService: jest.fn(),
}));

afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('GET /api/room/', () => {
    it('should return all the room with a 200 OK status code', async () => {
        getAllRoomsService.mockResolvedValue([
            { id: 0, length: 20, width: 9, height: 8 }, 
            { id: 1, length: 12, width: 6, height: 4 }
        ]);

        const request = {};
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await getAllRoomsController(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith([
            { id: 0, length: 20, width: 9, height: 8 }, 
            { id: 1, length: 12, width: 6, height: 4 }
        ]);
    });

    it('should return a 500 Internal Server Error when database connection fails', async () => {
        getAllRoomsService.mockRejectedValue(new Error('Database connection failed.'));

        const request = {};
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await getAllRoomsController(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith(
            { data: [], error: 'Internal Server Error: Error fetching data' }
        );
    });

    it('should return a 500 Internal Server Error when there is a code exception', async () => {
        getAllRoomsService.mockRejectedValue(new Error('Code exception'));

        const request = {};
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await getAllRoomsController(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith(
            { data: [], error: 'Internal Server Error: Error fetching data' }
        );
    });

    it('should return a 500 Internal Server Error when request times out', async () => {
        getAllRoomsService.mockRejectedValue(new Error('timeout'));

        const request = {};
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await getAllRoomsController(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith(
            { data: [], error: 'Internal Server Error: External service timeout' }
        );
    });

    it('should return a 500 Internal Server Error when too many clients already (POSTGRES ERROR MESSAGE)', async () => {
        getAllRoomsService.mockRejectedValue(new Error('too many clients already'));

        const request = {};
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await getAllRoomsController(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith(
            { data: [], error: 'too many clients already' }
        );
    });
});

describe('GET /api/room/:id', () => {
  
    it('should return the room data and 200 status code when the ID is valid', async () => {

        getRoomByIdService.mockResolvedValue(
            { id:2, "length": 8,"width": 8,"height": 10 }
        );

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '2' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);
        
        expect(getRoomByIdService).toHaveBeenCalledWith(2);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(
            { id:2, "length": 8,"width": 8,"height": 10 }
        );
    });

    it('should return the room and 200 status code because ID being 0 is valid', async () => {
        getRoomByIdService.mockResolvedValue(
            { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        );

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '0' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);
        
        expect(getRoomByIdService).toHaveBeenCalledWith(0);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(
            { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        );
    });

    it('should return a 400 status code when the ID is a non integer string', async () => {

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: 'notainteger' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Invalid ID. Must be a positive integer.' 
        });
    });

    it('should return a 400 status code when the ID is a negative integer', async () => {

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '-100' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Invalid ID. Must be a positive integer.' 
        });
    });

    it('should return a 400 status code when the ID is a has leading zeros', async () => {

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '0001' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Invalid ID. Must not have trailing zeros.' 
        });
    });

    it('should return a 400 status code when the ID has unintended scripts', async () => {

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '1; DROP TABLE room' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Invalid ID. Must be a positive integer.' 
        });
    });

    it('should return a 404 status code when ID does not exist', async () => {

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '99999999999999' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Room with that ID not found.' 
        });
    });

    it('should return a 415 status code when content type is not application/json', async () => {

        getRoomByIdService.mockResolvedValue(
            { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        );

        const request = { 
            headers: { 'Content-Type': 'text/html' },
            params: { id: '0' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await getRoomByIdController(request, response);

        expect(response.status).toHaveBeenCalledWith(415);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: '415 Unsupported Media Type: The request body must be in JSON format.' 
        });
    });
});