const test = require('node:test');
const assert = require('assert');
const { getAllRoomsService, getRoomByIdService, addRoomService, updateRoomService, deleteRoomService } = require('../services/roomServices');

let response;
test('should return all current rooms', () => {
    response = getAllRoomsService();

    assert.strictEqual(response.length, 2);
    assert.strictEqual(response[0].length, 5);
    assert.strictEqual(response[1].width, 10);
});

test('should return valid room under the id selected', () => {
    response = getRoomByIdService(1);

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

test('should update a valid new room to the database', () => {

    let updateDataRoom = {
        length: 12,
        width: 22,
        height: 32
    };

    response = updateRoomService(2, updateDataRoom);
    let testUpdatedRoom = getRoomByIdService(2);

    assert.strictEqual(testUpdatedRoom.width, 22);
});

// MOST LIKELY WILL CHANGE WITH ACTUAL DATABASE
test('should delete room under the id selected', () => {

    let roomCountBefore = [...getAllRoomsService()]; // this is storing copy of array rather than reference
    response = deleteRoomService(1);
    let roomCountAfter = getAllRoomsService();

    assert.strictEqual(roomCountBefore.length, 3);
    assert.strictEqual(roomCountAfter.length, 2);
});