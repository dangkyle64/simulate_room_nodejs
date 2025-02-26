const { updateFurnitureService } = require('../services/furnitureServices');
const { updateFurnitureController } = require('../controllers/furnitureController');

jest.mock('../services/furnitureServices', () => ({
    updateFurnitureService: jest.fn()
}));

beforeEach(() => {
    jest.clearAllMocks(); 
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks(); 
});

describe('PUT /api/furniture/:id', () => {
    it('should update the furniture, returning back the updated data, message of success, and the 200 OK status message', async () => {

        updateFurnitureService.mockResolvedValue({ id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0, toJSON: jest.fn().mockReturnValue({ id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 })});

        const request = {
            params: { id: '1' },
            body: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 },
        };
        const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await updateFurnitureController(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            message: 'Furniture successfully updated',
            updateFurniture: { id: 0, type: "Sofa", modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 }
        });
    });

    it('should return a 400 status error error as the type is not a string', async () => {

      updateFurnitureService.mockRejectedValue({data: null, error: 'Invalid type update. Must be a string.', toJSON: jest.fn().mockReturnValue({ data: null, error: 'Invalid type update. Must be a string.' })});

      const request = {
          params: { id: '1' },
          body: { id: 0, type: 12345, modelUrl: "https://example.com/sofa-model", length: 20, width: 9, height: 8, x_position: 10, y_position: 5, z_position: 0, rotation_x: 0, rotation_y: 45, rotation_z: 0 },
      };
      const response = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await updateFurnitureController(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
          data: null,
          error: 'Invalid type update. Must be a string.'
      });
  });


  /**
   * 
   *         if (isNaN(id)) {
            return response.status(400).json({ message: 'Invalid ID input' });
        };

        if (typeof updateData.type !== 'string' || !updateData.type) {
                return response.status(400).json({ error: 'Furniture type must be a non-empty string.' });
            };

            if (!Number.isInteger(updateData.length) || updateData.length < 0) {
                return response.status(400).json({ error: 'Furniture length update must be a valid positive integer' });
            };

            if (!Number.isInteger(updateData.width) || updateData.width < 0) {
                return response.status(400).json({ error: 'Furniture width update must be a valid positive integer' });
            };

            if (!Number.isInteger(updateData.height) || updateData.height < 0) {
                return response.status(400).json({ error: 'Furniture height update must be a valid positive integer' });
            };

   * Test to verify that the controller returns a 404 error when trying to update 
   * a non-existent furniture item. This test simulates a "not found" scenario.
   
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

  
   * Test to verify that the controller returns a 400 error when attempting to update
   * with an invalid type (e.g., type is not a string).
   
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
  */
});
