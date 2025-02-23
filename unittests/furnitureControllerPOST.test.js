/**
 * @fileOverview This file contains tests for the Furniture Controller POST API.
 * It tests the endpoint for adding a new furniture item, ensuring that
 * the correct responses are returned for valid and invalid requests.
 * 
 * The tests are designed to mock the service layer (e.g., `addFurnitureService`)
 * to simulate database interaction, ensuring that the controller logic is validated
 * without affecting the actual database.
 * 
 * Tests:
 * - POST /api/furniture for valid furniture data (successful creation)
 * - POST /api/furniture for invalid furniture data (missing fields, invalid data)
 * 
 * @module furnitureControllerPOST.test.js
 */

const request = require('supertest');
const app = require('../test_server'); // Your Express app
const { addFurnitureService } = require('../services/furnitureServices');

// Mock the service function to simulate database responses
jest.mock('../services/furnitureServices', () => ({
  addFurnitureService: jest.fn(),
}));

/**
 * After each test, reset all mocks to ensure no state leaks between tests.
 */
afterEach(() => {
    jest.resetAllMocks(); // Reset mock states to avoid state leaks between tests
});

describe('POST /api/furniture', () => {

  /**
   * Test to verify that the controller successfully creates a new furniture
   * item when valid data is provided. This test mocks the service response
   * to simulate successful furniture creation.
   */
  it('should create a new furniture item when valid data is provided', async () => {
    // Mock the service response for valid data (simulating successful creation)
    addFurnitureService.mockResolvedValue({
      id: 1,
      type: 'Chair',
      length: 100,
      width: 50,
      height: 80,
    });

    const newFurniture = {
      type: 'Chair',
      length: 100,
      width: 50,
      height: 80,
    };

    const response = await request(app)
      .post('/api/furniture')
      .send(newFurniture)
      .expect(201); // Expecting a 201 status code for successful creation

    // Assert that the response contains the expected furniture properties
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('type', 'Chair');
    expect(response.body).toHaveProperty('length', 100);
    expect(response.body).toHaveProperty('width', 50);
    expect(response.body).toHaveProperty('height', 80);
  });

  /**
   * Test to verify that the controller returns a 400 error when invalid
   * data is provided (e.g., missing required fields or incorrect types).
   */
  it('should return 400 for invalid furniture data (missing or incorrect fields)', async () => {
    const invalidFurniture = {
      // Missing required fields, e.g., length and width
      type: 'Chair',
      height: 80,
    };

    const response = await request(app)
      .post('/api/furniture')
      .send(invalidFurniture)
      .expect(400); // Expecting a 400 status code for bad request

    // Assert that the correct error message is returned
    expect(response.body.error).toBe('Furniture length is required and must be a positive integer');
  });

  /**
   * Test to verify that the controller returns a 400 error when a non-string
   * type is provided for the furniture (invalid type).
   */
  it('should return 400 for invalid furniture type (not a string)', async () => {
    const invalidFurniture = {
      type: 123, // Invalid type, should be a string
      length: 100,
      width: 50,
      height: 80,
    };

    const response = await request(app)
      .post('/api/furniture')
      .send(invalidFurniture)
      .expect(400); // Expecting a 400 status code for bad request

    // Assert that the correct error message is returned
    expect(response.body.error).toBe('Furniture type is required and must be a string.');
  });

  /**
   * Test to verify that the controller returns a 400 error when a negative
   * furniture dimension is provided (invalid dimension).
   */
  it('should return 400 for negative furniture dimensions', async () => {
    const invalidFurniture = {
      type: 'Chair',
      length: -100, // Invalid, should be a positive integer
      width: 50,
      height: 80,
    };
  
    const response = await request(app)
      .post('/api/furniture')
      .send(invalidFurniture)
      .expect(400); // Expecting a 400 status code for bad request
  
    expect(response.body.error).toBe('Furniture length is required and must be a positive integer');
  });

  /**
   * Test to verify that the controller returns a 400 error when the type is an empty string.
   * Empty string should not be allowed as a valid type.
   */
  it('should return 400 for empty string type', async () => {
    const invalidFurniture = {
      type: '', // Invalid, should be a non-empty string
      length: 100,
      width: 50,
      height: 80,
    };
  
    const response = await request(app)
      .post('/api/furniture')
      .send(invalidFurniture)
      .expect(400); // Expecting a 400 status code for bad request
  
    expect(response.body.error).toBe('Furniture type is required and must be a string.');
  });

  /**
   * Test to verify that the controller returns a 400 error when the type is null.
   * Null value should not be allowed as a valid type.
   */
  it('should return 400 for null type', async () => {
    const invalidFurniture = {
      type: null, // Invalid, should be a non-null string
      length: 100,
      width: 50,
      height: 80,
    };
  
    const response = await request(app)
      .post('/api/furniture')
      .send(invalidFurniture)
      .expect(400); // Expecting a 400 status code for bad request
  
    expect(response.body.error).toBe('Furniture type is required and must be a string.');
  });

  /**
   * Test to verify that the controller returns a 400 error when the type consists only of whitespace.
   * A type that is just whitespace should not be accepted as a valid type.
   */
  it('should return 400 for empty string type', async () => {
    const invalidFurniture = {
      type: '         ', // Invalid, should be a non-empty string
      length: 100,
      width: 50,
      height: 80,
    };
  
    const response = await request(app)
      .post('/api/furniture')
      .send(invalidFurniture)
      .expect(400); // Expecting a 400 status code for bad request
  
    expect(response.body.error).toBe('Furniture type is required and must be a string.');
  });
});
