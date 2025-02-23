/**
 * @fileOverview This file contains tests for the Furniture Controller DELETE API.
 * It tests the endpoint for deleting a furniture item by its ID, ensuring that
 * the correct responses are returned for valid, non-existent, and invalid IDs.
 * 
 * The tests are designed to mock the service layer (e.g., `deleteFurnitureService`)
 * to simulate database interaction, ensuring that the controller logic is validated
 * without affecting the actual database.
 * 
 * Tests:
 * - DELETE /api/furniture/:id for valid furniture ID (successful deletion)
 * - DELETE /api/furniture/:id for non-existent furniture ID (not found)
 * - DELETE /api/furniture/:id for invalid ID format (bad request)
 * 
 * @module furnitureControllerDELETE.test.js
 */

const request = require('supertest');
const app = require('../test_server'); // Import your Express app instance
const { deleteFurnitureService } = require('../services/furnitureServices');

// Mock the service function to simulate different database responses
jest.mock('../services/furnitureServices', () => ({
  deleteFurnitureService: jest.fn(),  // Mocking the deleteFurnitureService function
}));

/**
 * After each test, reset all mocks to ensure no state leaks between tests.
 */
afterEach(() => {
    jest.resetAllMocks(); // Reset mock states after each test to avoid cross-test contamination
});

describe('DELETE /api/furniture/:id', () => {

  /**
   * Test to verify that the controller successfully deletes a furniture item
   * when a valid ID is provided. This test mocks the service response to simulate
   * successful deletion and checks if the controller returns the correct response.
   */
  it('should delete the furniture item when the ID is valid', async () => {
    // Mock the service response for valid ID deletion
    deleteFurnitureService.mockResolvedValue({
      message: 'Furniture deleted successfully',
    });

    const response = await request(app)
      .delete('/api/furniture/1')  // Valid ID
      .expect(200);  // Expect a 200 OK response

    // Assert that the response confirms successful deletion
    expect(response.body.message).toBe('Furniture deleted successfully');
  });

  /**
   * Test to verify that the controller returns a 404 error when trying to
   * delete a non-existent furniture item. This test mocks the service response
   * to simulate a "not found" scenario.
   */
  it('should return 404 for a non-existent furniture ID', async () => {
    // Mock the service response for invalid ID (item not found)
    deleteFurnitureService.mockResolvedValue(null);

    const response = await request(app)
      .delete('/api/furniture/999999')  // Non-existent ID
      .expect(404);  // Expect a 404 Not Found response

    // Assert that the correct error message is returned for non-existent furniture
    expect(response.body.message).toBe('Furniture not found');
  });

  /**
   * Test to verify that the controller returns a 400 error when an invalid ID
   * format is provided. This test simulates an invalid ID format to ensure
   * that the controller handles this properly.
   */
  it('should return 400 for invalid ID format', async () => {
    const response = await request(app)
      .delete('/api/furniture/invalidID')  // Invalid ID format (non-numeric)
      .expect(400);  // Expect a 400 Bad Request response

    // Assert that the correct error message is returned for invalid ID format
    expect(response.body.message).toBe('Invalid ID input');
  });

  /**
   * Test to verify that the controller returns a 400 error when the ID contains
   * leading zeros. This test ensures that IDs with leading zeros are not accepted.
   */
  it('should return 400 for an ID with leading zeros', async () => {
    const response = await request(app)
      .delete('/api/furniture/00001')  // ID with leading zeros
      .expect(400);  // Expect a 400 Bad Request response

    // Assert that the correct error message is returned for IDs with leading zeros
    expect(response.body.message).toBe('Invalid ID input');
  });

    /**
     * Test to verify that the controller returns a 400 error for potential query
     * parameter injection attacks in the ID. This test simulates an attack vector
     * to ensure that the ID is sanitized properly.
     */
    it('should return 400 for query parameter injection in the ID', async () => {
        const response = await request(app)
        .delete('/api/furniture/1; DROP TABLE furniture')  // Potential SQL injection in ID
        .expect(400);  // Expect a 400 Bad Request response

        // Assert that the correct error message is returned for potential SQL injection
        expect(response.body.message).toBe('Invalid ID input');
    });
});
