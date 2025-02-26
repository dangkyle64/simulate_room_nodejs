const { addRoomService } = require('../services/roomServices');
const { addRoomController } = require('../controllers/roomController');

jest.mock('../services/roomServices', () => ({
    addRoomService: jest.fn(),
}));

afterEach(() => {
    jest.resetAllMocks(); 
});

describe('POST /api/room', () => {
    it('should return the newly created room and a 201 created status code', async () => {

        addRoomService.mockResolvedValue({ id: 0, length: 20, width: 9, height: 8 });

        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 20, width: 9, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith(
            { id: 0, length: 20, width: 9, height: 8 }
        );
    });

    it('should return the 400 status code when length is a nonnumeric string', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 'notaninteger', width: 9, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is null', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: null, width: 9, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is a negative integer', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: -100, width: 9, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is whitespace', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: '        ', width: 9, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when length is not initialized', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, width: 9, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid length. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is a nonnumeric string', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: 'notaninteger', height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is null', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: null, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is a negative integer', async () => {

        const request = {
            headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: -9, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is whitespace', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: '       ', height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when width is not initialized', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, height: 8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid width. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is a nonnumeric string', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: 19, height: 'notaninteger' }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is null', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: 8, height: null }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is a negative integer', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: 9, height: -8 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is whitespace', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: 4, height: '       ' }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });

    it('should return the 400 status code when height is not initialized', async () => {

        const request = {
          headers: { 'Content-Type': 'application/json' },
            body: { id: 0, length: 1, width: 9 }
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await addRoomController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid height. Must be a positive integer.'
        });
    });
});
