const { deleteFurnitureService } = require('../services/furnitureServices');
const { deleteFurnitureController } = require('../controllers/furnitureController');

jest.mock('../services/furnitureServices', () => ({
    deleteFurnitureService: jest.fn(),  
}));

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks(); // Reset mock states after each test to avoid cross-test contamination
});

describe('DELETE /api/furniture/:id', () => {
    it('should delete the furniture and return a 204 No Content status code', async () => {

        deleteFurnitureService.mockResolvedValue({});

        const request = {
            headers: { 'Content-Type': 'application/json' },
            params: { id: '1' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await deleteFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).not.toHaveBeenCalled();
    });

    it('should delete the furniture and return a 204 No Content status code because 0 is a valid id', async () => {

        deleteFurnitureService.mockResolvedValue({});

        const request = {
            headers: { 'Content-Type': 'application/json' },
            params: { id: '0' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await deleteFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).not.toHaveBeenCalled();
    });

    it('should return a 400 status code when the ID is a non integer string', async () => {

        deleteFurnitureService.mockResolvedValue({});

        const request = {
            headers: { 'Content-Type': 'application/json' },
            params: { id: 'notaproperintegertodeletefrom' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await deleteFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Invalid ID. Must be a positive integer.' 
        });
    });

    it('should return a 400 status code when the ID is a negative integer', async () => {

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '-204' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await deleteFurnitureController(request, response);

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

        await deleteFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Invalid ID. Must not have trailing zeros.' 
        });
    });

    it('should return a 400 status code when the ID has unintended scripts', async () => {

        const request = { 
            headers: { 'Content-Type': 'application/json' },
            params: { id: '1; DROP TABLE furniture' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await deleteFurnitureController(request, response);

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

        await deleteFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: 'Furniture with that ID not found.' 
        });
    });

    it('should return a 415 status code when content type is not application/json', async () => {

        deleteFurnitureService.mockResolvedValue(
            { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        );

        const request = { 
            headers: { 'Content-Type': 'text/html' },
            params: { id: '0' } 
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

        await deleteFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(415);
        expect(response.json).toHaveBeenCalledWith({ 
            data: null,
            error: '415 Unsupported Media Type: The request body must be in JSON format.' 
        });
    });
});
