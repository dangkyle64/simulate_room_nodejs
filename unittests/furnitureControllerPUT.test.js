/**
 * @fileOverview This file contains tests for the Furniture Controller PUT API.
 * It tests the endpoint for updating an existing furniture item, ensuring that
 * the correct responses are returned for valid and invalid requests.
 * 
 * The tests are designed to mock the service layer (e.g., `getFurnitureByIdService`,
 * `updateFurnitureService`) to simulate database interaction, ensuring that the 
 * controller logic is validated without affecting the actual database.
 * 
 * Tests:
 * - PUT /api/furniture/:id for valid furniture data (successful update)
 * - PUT /api/furniture/:id for non-existent furniture (404 Not Found)
 * - PUT /api/furniture/:id for invalid data (missing fields, invalid data)
 * - PUT /api/furniture/:id for attempting to update with invalid ID
 * - PUT /api/furniture/:id for attempting to update with invalid data types
 * 
 * @module furnitureControllerPUT.test.js
 */

const request = require('supertest');
const app = require('../test_server'); // Your Express app
const { getFurnitureByIdService, updateFurnitureService } = require('../services/furnitureServices');

// Mock the service functions
jest.mock('../services/furnitureServices', () => ({
  getFurnitureByIdService: jest.fn(),
  updateFurnitureService: jest.fn(),
}));

/**
 * After each test, reset all mocks to ensure no state leaks between tests.
 */
afterEach(() => {
  jest.resetAllMocks(); // Reset mock states after each test to ensure no test interference
});

describe('PUT /api/furniture/:id', () => {

  /**
   * Test to verify that the controller returns a 404 error when trying to update 
   * a non-existent furniture item. This test simulates a "not found" scenario.
   */
  it('should return 404 for non-existent furniture (furniture not found)', async () => {
    // Mock `getFurnitureByIdService` to return null, indicating furniture not found
    getFurnitureByIdService.mockResolvedValue(null);

    const response = await request(app)
      .put('/api/furniture/999999') // Non-existent furniture ID
      .send({
        type: 'Sofa',
        length: 200,
        width: 100,
        height: 80,
      })
      .expect(404); // Expect 404 for furniture not found

    expect(response.body.message).toBe('Furniture not found');
  });

  /**
   * Test to verify that the controller successfully updates an existing furniture item.
   * This test mocks the service response to simulate successful update and checks the response.
   */
  it('should update furniture when valid data is provided', async () => {
    // Mock the service to simulate a successful fetch and update
    getFurnitureByIdService.mockResolvedValue({
      id: 1,
      type: 'Chair',
      length: 100,
      width: 50,
      height: 80,
    });
  
    // Mock the updateFurnitureService to simulate the updated furniture
    updateFurnitureService.mockResolvedValue({
      id: 1,
      type: 'Sofa',
      length: 200,
      width: 100,
      height: 80,
      // This mimics what Sequelize's `.update()` method will return
      toJSON: function() { return this; } // Adding toJSON to return the object as is
    });
  
    const updatedFurniture = {
      type: 'Sofa',
      length: 200,
      width: 100,
      height: 80,
    };
  
    const response = await request(app)
      .put('/api/furniture/1') // Existing furniture ID
      .send(updatedFurniture)
      .expect(200); // Expect 200 for successful update
  
    // Expect the response to contain 'message' and 'updateFurniture'
    expect(response.body.message).toBe('Furniture successfully updated');
    expect(response.body.updateFurniture).toHaveProperty('id', 1);
    expect(response.body.updateFurniture).toHaveProperty('type', 'Sofa');
    expect(response.body.updateFurniture).toHaveProperty('length', 200);
    expect(response.body.updateFurniture).toHaveProperty('width', 100);
    expect(response.body.updateFurniture).toHaveProperty('height', 80);
  });
  

  /**
   * Test to verify that the controller returns a 400 error when missing required fields
   * (e.g., missing dimensions). This test simulates an invalid update with missing fields.
   */
  it('should return 400 for missing required fields in update request', async () => {
    // Mock `getFurnitureByIdService` to return an existing furniture item
    getFurnitureByIdService.mockResolvedValue({
      id: 1,
      type: 'Chair',
      length: 100,
      width: 50,
      height: 80,
    });

    const invalidUpdate = {
      // Missing 'length', 'width', and 'height' fields
      type: 'Sofa',
    };

    const response = await request(app)
      .put('/api/furniture/1') // Existing furniture ID
      .send(invalidUpdate)
      .expect(400); // Expect 400 for bad request

    expect(response.body.error).toBe('Furniture length update must be a valid positive integer');
  });

  /**
   * Test to verify that the controller returns a 400 error when attempting to update
   * with an invalid type (e.g., type is not a string).
   */
  it('should return 400 for invalid furniture type (not a string)', async () => {
    // Mock `getFurnitureByIdService` to return an existing furniture item
    getFurnitureByIdService.mockResolvedValue({
      id: 1,
      type: 'Chair',
      length: 100,
      width: 50,
      height: 80,
    });

    const invalidUpdate = {
      type: 123, // Invalid type, should be a string
      length: 200,
      width: 100,
      height: 80,
    };

    const response = await request(app)
      .put('/api/furniture/1') // Existing furniture ID
      .send(invalidUpdate)
      .expect(400); // Expect 400 for bad request

    expect(response.body.error).toBe('Furniture type must be a non-empty string.');
  });

  /**
   * Test to verify that the controller returns a 400 error when attempting to update
   * with a negative furniture dimension.
   */
  it('should return 400 for negative furniture dimensions', async () => {
    // Mock `getFurnitureByIdService` to return an existing furniture item
    getFurnitureByIdService.mockResolvedValue({
      id: 1,
      type: 'Chair',
      length: 100,
      width: 50,
      height: 80,
    });

    const invalidUpdate = {
      type: 'Sofa',
      length: -200, // Invalid dimension, should be positive
      width: 100,
      height: 80,
    };

    const response = await request(app)
      .put('/api/furniture/1') // Existing furniture ID
      .send(invalidUpdate)
      .expect(400); // Expect 400 for bad request

    expect(response.body.error).toBe('Furniture length update must be a valid positive integer');
  });

  /**
   * Test to verify that the controller returns a 400 error when the type is an empty string.
   */
  it('should return 400 for empty string type in update request', async () => {
    // Mock `getFurnitureByIdService` to return an existing furniture item
    getFurnitureByIdService.mockResolvedValue({
      id: 1,
      type: 'Chair',
      length: 100,
      width: 50,
      height: 80,
    });

    const invalidUpdate = {
      type: '', // Invalid, empty string should not be allowed
      length: 200,
      width: 100,
      height: 80,
    };

    const response = await request(app)
      .put('/api/furniture/1') // Existing furniture ID
      .send(invalidUpdate)
      .expect(400); // Expect 400 for bad request

    expect(response.body.error).toBe('Furniture type must be a non-empty string.');
  });

  /**
   * Test to verify that the controller returns a 400 error when the ID provided in the URL is invalid.
   */
  it('should return 400 for invalid furniture ID format', async () => {
    const response = await request(app)
      .put('/api/furniture/invalidID') // Invalid ID format
      .send({
        type: 'Sofa',
        length: 200,
        width: 100,
        height: 80,
      })
      .expect(400); // Expect 400 for invalid ID format
  
    expect(response.body.message).toBe('Invalid ID input'); // Adjusted to match the current handler
  });
  
});
