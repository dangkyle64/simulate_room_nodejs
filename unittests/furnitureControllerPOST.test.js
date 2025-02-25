const { addFurnitureService } = require('../services/furnitureServices');
const { addFurnitureController } = require('../controllers/furnitureController');

jest.mock('../services/furnitureServices', () => ({
    addFurnitureService: jest.fn(),
}));

afterEach(() => {
    jest.resetAllMocks(); 
});

describe('POST /api/furniture', () => {
    it('should return the newly created furniture and a 201 created status code', async () => {

        addFurnitureService.mockResolvedValue({ id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 });

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith(
            { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        );
    });

    it('should return 400 status code when type is not a string', async () => {

        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: 12345, modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            data: null,
            error: 'Invalid Type. Must be a valid string.'
        });
    });

    it('should return 400 status code when type is an empty input', async () => {

        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: '', modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            data: null,
            error: 'Invalid Type. Must be a valid string.'
        });
    });

    it('should return 400 status code when type is an input with only spaces', async () => {

        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: '         ', modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            data: null,
            error: 'Invalid Type. Must be a valid string.'
        });
    });

    it('should return 400 status code when modelUrl is an integer rather than a valid url', async () => {
        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: 'Chair', modelUrl: 12345, length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    
        await addFurnitureController(request, response);
    
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            data: null,
            error: 'Invalid modelUrl. Must be a valid url.'
        });
    });

    it('should return 400 status code when modelUrl is null rather than a valid url', async () => {
        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: 'Chair', modelUrl: null, length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    
        await addFurnitureController(request, response);
    
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            data: null,
            error: 'Invalid modelUrl. Must be a valid url.'
        });
    });

    it('should return 400 status code when modelUrl is an incorrect website setup rather than a valid url', async () => {
        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: 'Chair', modelUrl: 'google.net', length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    
        await addFurnitureController(request, response);
    
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            data: null,
            error: 'Invalid modelUrl. Must be a valid url.'
        });
    });

    it('should return the 400 status code when length is a nonnumeric string', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 'notaninteger', width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is null', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: null, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is a negative integer', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: -100, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is whitespace', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: '        ', width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is not initialized', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is a nonnumeric string', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: 'notaninteger', height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is null', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: null, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is a negative integer', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: -9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is whitespace', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: '       ', height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is not initialized', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is a nonnumeric string', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: 19, height: 'notaninteger', x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is null', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: 8, height: null, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is a negative integer', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: 9, height: -8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is whitespace', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: 4, height: '       ', x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is not initialized', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 1, width: 9, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });
});
