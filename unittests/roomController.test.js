process.env.NODE_ENV = 'test';

const test = require('node:test');
const assert = require('assert');
const request = require('supertest');

const app = require('../test_server');

let response; 
test('should return a 404 error because null is not a valid id', async () => {

    response = await request(app)
        .get('/api/room/null')
        .expect(404);

    assert.strictEqual(response.body.message, 'Room not found');
});

test('should return a 404 error because string is not a valid id', async () => {

    response = await request(app)
        .get(`/api/room/${'stringvaluethathappenstobehere'}`)
        .expect(404);
    
    assert.strictEqual(response.body.message, 'Room not found');
});

let newInvalidRoom;
test('should return a 400 error because string is not a valid length input', async () => {

    newInvalidRoom = {
        length: 'one',
        width: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room length is required and must be a positive integer');
});

test('should return a 400 error because string is not a valid width input', async () => {

    newInvalidRoom = {
        length: 1,
        width: 'one',
        height: 1
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room width is required and must be a positive integer');
});

test('should return a 400 error because string is not a valid height input', async () => {

    newInvalidRoom = {
        length: 1,
        width: 1,
        height: 'one'
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room height is required and must be a positive integer');
});

test('should return a 400 error because empty input is not a valid length input', async () => {

    newInvalidRoom = {
        width: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room length is required and must be a positive integer');
});

test('should return a 400 error because empty input is not a valid width input', async () => {

    newInvalidRoom = {
        length: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room width is required and must be a positive integer');
});

test('should return a 400 error because empty input is not a valid height input', async () => {

    newInvalidRoom = {
        length: 1,
        width: 1
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room height is required and must be a positive integer');
});

test('should return a 400 error because null input is not a valid length input', async () => {

    newInvalidRoom = {
        length: null,
        width: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room length is required and must be a positive integer');
});

test('should return a 400 error because null input is not a valid width input', async () => {

    newInvalidRoom = {
        length: 1,
        width: null,
        height: 1
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room width is required and must be a positive integer');
});

test('should return a 400 error because null input is not a valid height input', async () => {

    newInvalidRoom = {
        length: 1,
        width: 1,
        height: null
    };

    response = await request(app)
        .post('/api/room/')
        .send(newInvalidRoom)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Room height is required and must be a positive integer');
});

// updateRoom tests =============================================================================

test('should return a 400 error because length needs to be a valid positive integer', async () => {

    let newInvalidRoom = {
        length: 'one',
        width: 1,
        height: 1
    };

    response = await request(app)
        .put('/api/room/1')
        .send(newInvalidRoom)
        .expect(400)

        assert.strictEqual(response.body.error, 'Room length update must be a valid positive integer');
});

test('should return a 400 error because width needs to be a valid positive integer', async () => {

    let newInvalidRoom = {
        length: 1,
        width: 'one',
        height: 1
    };

    response = await request(app)
        .put('/api/room/1')
        .send(newInvalidRoom)
        .expect(400)

        assert.strictEqual(response.body.error, 'Room width update must be a valid positive integer');
});

test('should return a 400 error because height needs to be a valid positive integer', async () => {

    let newInvalidRoom = {
        length: 1,
        width: 1,
        height: 'one'
    };

    response = await request(app)
        .put('/api/room/1')
        .send(newInvalidRoom)
        .expect(400)

        assert.strictEqual(response.body.error, 'Room height update must be a valid positive integer');
});

test('should return a 400 error because length needs to be a valid positive integer', async () => {

    let newInvalidRoom = {
        length: null,
        width: 1,
        height: 1
    };

    response = await request(app)
        .put('/api/room/1')
        .send(newInvalidRoom)
        .expect(400)

        assert.strictEqual(response.body.error, 'Room length update must be a valid positive integer');
});

test('should return a 400 error because width needs to be a valid positive integer', async () => {

    let newInvalidRoom = {
        length: 1,
        width: null,
        height: 1
    };

    response = await request(app)
        .put('/api/room/1')
        .send(newInvalidRoom)
        .expect(400)

        assert.strictEqual(response.body.error, 'Room width update must be a valid positive integer');
});

test('should return a 400 error because height needs to be a valid positive integer', async () => {

    let newInvalidRoom = {
        length: 1,
        width: 1,
        height: null
    };

    response = await request(app)
        .put('/api/room/1')
        .send(newInvalidRoom)
        .expect(400)

        assert.strictEqual(response.body.error, 'Room height update must be a valid positive integer');
});

// deleteRoom tests =============================================================================
test('should return a 404 error because 50 is not a valid room', async () => {

    response = await request(app)
        .delete('/api/room/50')
        .expect(404)

    assert.strictEqual(response.body.message, 'Room not found');
});

test('should return a 404 error because null is not a valid room', async () => {

    response = await request(app)
        .delete('/api/room/null')
        .expect(404)

    assert.strictEqual(response.body.message, 'Room not found');
});

test('should return a 404 error because one is not a valid room', async () => {

    response = await request(app)
        .delete('/api/room/one')
        .expect(404)

    assert.strictEqual(response.body.message, 'Room not found');
});