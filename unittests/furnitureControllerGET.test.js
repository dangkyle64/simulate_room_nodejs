const request = require('supertest');
const app = require('../test_server'); // Your server setup

/**
 * @description
 * These tests verify the behavior of the **controller** layer in handling GET requests for the `/api/furniture/:id` route.
 * The controller is responsible for receiving HTTP requests, interacting with the service layer, and returning appropriate HTTP responses.
 * These tests check that the controller correctly handles invalid and valid inputs, and returns the correct HTTP status codes and messages.
 */
describe('GET /api/furniture/:id', () => {
    
    /**
     * @description
     * Test case for invalid furniture ID: 'null'.
     * The controller should return a 404 error since 'null' is not a valid ID.
     */
    test('should return a 404 error because null is not a valid id', async () => {
        const response = await request(app)
            .get('/api/furniture/null')
            .expect(404);

        expect(response.body.message).toBe('Furniture not found');
    });

    /**
     * @description
     * Test case for an invalid furniture ID: a string that cannot be cast to a valid ID.
     * The controller should return a 404 error because the string is not a valid ID.
     */
    test('should return a 404 error because string is not a valid id', async () => {
        const response = await request(app)
            .get(`/api/furniture/${'stringvaluethathappenstobehere'}`)
            .expect(404);

        expect(response.body.message).toBe('Furniture not found');
    });

    /**
     * @description
     * Test case for a furniture ID that does not exist (e.g., ID 50).
     * The controller should return a 404 error if the furniture with the given ID is not found.
     */
    test('should return a 404 error because the furniture with that id does not exist', async () => {
        const response = await request(app)
            .get('/api/furniture/50') // assuming 50 is non-existent
            .expect(404);

        expect(response.body.message).toBe('Furniture not found');
    });

    /**
     * @description
     * Test case for a valid furniture ID (e.g., ID 1).
     * The controller should return the correct furniture data in the response body when a valid ID is provided.
     */
    test('should return the furniture data when the ID is valid', async () => {
        // Assuming there's a valid furniture with ID 1 in your test DB
        const response = await request(app)
            .get('/api/furniture/1')
            .expect(200);

        expect(response.body).toHaveProperty('type');
        expect(response.body).toHaveProperty('length');
        expect(response.body).toHaveProperty('width');
        expect(response.body).toHaveProperty('height');
        expect(response.body.id).toBe(1);
    });
});
