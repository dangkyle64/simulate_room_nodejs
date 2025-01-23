const test = require('node:test');
const assert = require('assert');
const { getAllRoomsService, getRoomByIdService, addRoomService } = require('../services/roomServices');

let response;
test('should return all current rooms', () => {
    response = getAllRoomsService();

    assert.strictEqual(response.length, 2);
    assert.strictEqual(response[0].length, 5);
    assert.strictEqual(response[1].width, 10);
});

test('should return valid room under the id selected', () => {
    response = getRoomByIdService(0);

    assert.strictEqual(response.length, 5);
    assert.strictEqual(response.height, 5);
});

test('should add a new valid room to the database', () => {

    let newRoom = {
        length: 3,
        width: 3,
        height: 3
    };

    response = addRoomService(newRoom);
    let roomCount = getAllRoomsService();

    assert.strictEqual(roomCount.length, 3);
});