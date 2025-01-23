const test = require('node:test');
const assert = require('assert');
const { getAllFurnituresService, getFurnitureByIdService, addFurnitureService, deleteFurnitureService, updateFurnitureService } = require('../services/furnitureServices');

let response;
test('should return all current furniture', () => {

    response = getAllFurnituresService();
    
    assert.strictEqual(response.length, 2);
    assert.strictEqual(response[0].type, 'chair');
    assert.strictEqual(response[1].width, 7);
});

test('should return valid furniture under the id selected', () => {

    response = getFurnitureByIdService(2);
    assert.strictEqual(response.type, 'table');
    assert.strictEqual(response.length, 2);
    assert.strictEqual(response.height, 1);
});

test('should add a valid new furniture to the database', () => {

    let newFurniture = {
        type: 'banana',
        length: 1,
        width: 2,
        height: 3
    };

    response = addFurnitureService(newFurniture);
    let furnitureCount = getAllFurnituresService();

    assert.strictEqual(furnitureCount.length, 3);
});

test('should update a valid new furniture to the database', () => {

    let updateDataFurniture = {
        type: 'deletemepls',
        length: 12,
        width: 22,
        height: 32
    };

    response = updateFurnitureService(2, updateDataFurniture);
    let testUpdatedFurniture = getFurnitureByIdService(2);

    assert.strictEqual(testUpdatedFurniture.type, 'deletemepls');
});

// MOST LIKELY WILL CHANGE WITH ACTUAL DATABASE
test('should delete furniture under the id selected', () => {

    let furnitureCountBefore = [...getAllFurnituresService()]; // this is storing copy of array rather than reference
    response = deleteFurnitureService(1);
    let furnitureCountAfter = getAllFurnituresService();

    assert.strictEqual(furnitureCountBefore.length, 3);
    assert.strictEqual(furnitureCountAfter.length, 2);
});
