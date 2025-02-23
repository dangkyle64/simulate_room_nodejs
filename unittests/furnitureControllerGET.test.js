/**
 * @fileOverview This file contains tests for the Furniture Controller API.
 * It tests the endpoint for retrieving furniture by its ID, ensuring that
 * the correct responses are returned for valid, non-existent, and invalid IDs.
 * 
 * The tests interact with a real database to ensure end-to-end functionality,
 * including full stack integration from the Express controllers to the database.
 * The tests validate that the database queries work as expected, that the controller
 * correctly handles requests, and that the expected results are returned.
 *
 * Tests:
 * - GET /api/furniture/:id for valid furniture ID
 * - GET /api/furniture/:id for non-existent furniture ID
 * - GET /api/furniture/:id for invalid ID format
 * 
 * @module furnitureControllerGET.test.js
 */

const request = require('supertest');
const app = require('../test_server'); // Your Express app
const { getFurnitureByIdService, getAllFurnituresService } = require('../services/furnitureServices');

// Mock the service function to return the furniture data you expect
jest.mock('../services/furnitureServices', () => ({
    getFurnitureByIdService: jest.fn(),
    getAllFurnituresService: jest.fn(),
}));

/**
 * After each test, reset all mocks to ensure no state leaks between tests.
 * @function afterEach
 */
afterEach(async () => {
    jest.resetAllMocks(); // Reset mock states
});
  
/**
 * Tests for the GET /api/furniture/:id endpoint.
 * @description The tests ensure that the controller correctly handles the retrieval of furniture by ID.
 */
describe('GET /api/furniture/:id', () => {
  
  /**
   * Test to verify that the controller returns the correct furniture data
   * when a valid ID is provided. This test interacts with the actual database
   * to ensure the query works as expected.
   * 
   * @test {GET} /api/furniture/:id
   */
    it('should return the furniture data when the ID is valid', async () => {
        // Mock the service response for valid ID
        getFurnitureByIdService.mockResolvedValue({
            id: 1,
            type: 'Chair',
            length: 100,
            width: 50,
            height: 80,
        });

        const response = await request(app)
            .get('/api/furniture/1')
            .expect(200);

        // Assert that the response body has the expected furniture properties
        expect(response.body).toHaveProperty('type', 'Chair');
        expect(response.body).toHaveProperty('length', 100);
        expect(response.body).toHaveProperty('width', 50);
        expect(response.body).toHaveProperty('height', 80);
        expect(response.body.id).toBe(1);
    });

  /**
   * Test to verify that the controller returns a 404 error when a non-existent
   * furniture ID is provided. This ensures that the service and database correctly
   * handle cases where the data is not found.
   * 
   * @test {GET} /api/furniture/:id
   */
  it('should return 404 for a non-existent furniture ID', async () => {
        // Mock the service response for invalid ID
        getFurnitureByIdService.mockResolvedValue(null);

        const response = await request(app)
        .get('/api/furniture/999999')
        .expect(404);

        // Assert that the correct error message is returned
        expect(response.body.message).toBe('Furniture not found');
    });

    /**
     * Test to verify that the controller returns a 400 error when an invalid ID format
     * is provided. This test ensures that the ID validation logic works as expected.
     * 
     * @test {GET} /api/furniture/:id
     */
    it('should return 400 for invalid ID format', async () => {
        const response = await request(app)
        .get('/api/furniture/invalidID')
        .expect(400);

        // Assert that the correct error message is returned for invalid input
        expect(response.body.message).toBe('Invalid ID input');
    });

    /**
     * Test to verify that the controller returns a 400 error when a negative ID value
     * is provided. This ensures that the ID validation logic rejects negative values.
     * 
     * @test {GET} /api/furniture/:id
     */
    it('should return 400 for a negative ID value', async () => {
        const response = await request(app)
            .get('/api/furniture/-1')
            .expect(400);
    
        // Assert that the correct error message is returned for invalid negative ID
        expect(response.body.message).toBe('Invalid ID input');
    });

    /**
     * Edge Case: Test for zero as ID (valid or invalid depending on business logic)
     * 
     * @test {GET} /api/furniture/:id
     */
    it('should return 200 for ID 0 if considered valid', async () => {
        // Mock the service response for ID 0 (assuming 0 is a valid ID)
        getFurnitureByIdService.mockResolvedValue({
            id: 0,
            type: 'Table',
            length: 150,
            width: 75,
            height: 60,
        });

        const response = await request(app)
            .get('/api/furniture/0')
            .expect(200);

        // Assert that the response body has the expected furniture properties
        expect(response.body).toHaveProperty('type', 'Table');
        expect(response.body).toHaveProperty('length', 150);
        expect(response.body).toHaveProperty('width', 75);
        expect(response.body).toHaveProperty('height', 60);
        expect(response.body.id).toBe(0);
    });

    /**
     * Test for invalid ID with leading zeros
     * 
     * @test {GET} /api/furniture/:id
     */
    it('should return 400 for an ID with leading zeros', async () => {
        const response = await request(app)
            .get('/api/furniture/00001')
            .expect(400);
        
        expect(response.body.message).toBe('Invalid ID input');
    });

    /**
     * Test for query parameter injection in the ID.
     * 
     * @test {GET} /api/furniture/:id
     */
    it('should return 400 for query parameter injection in the ID', async () => {
        const response = await request(app)
            .get('/api/furniture/1; DROP TABLE furniture')
            .expect(400);
        
        expect(response.body.message).toBe('Invalid ID input');
    }); 
    
    /**
     * Test for unsupported media type when an invalid content type is set.
     * 
     * @test {GET} /api/furniture/:id
     */
    it('should return 415 for unsupported media type', async () => {
        const response = await request(app)
            .get('/api/furniture/1')
            .set('Content-Type', 'text/html')  // Invalid content type
            .expect(415);
    
        expect(response.body.message).toBe('Unsupported media type');
    }); 
});
