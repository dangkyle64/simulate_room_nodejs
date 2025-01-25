process.env.NODE_ENV = 'test';

const test = require('node:test');
const assert = require('assert');
const request = require('supertest');

const app = require('../test_server');

let response; 
test('should return a 404 error because null is not a valid id', async () => {

    response = await request(app)
        .get('/api/furniture/null')
        .expect(404);

    assert.strictEqual(response.body.message, 'Furniture not found');
});

test('should return a 404 error because string is not a valid id', async () => {

    response = await request(app)
        .get(`/api/furniture/${'stringvaluethathappenstobehere'}`)
        .expect(404);
    
    assert.strictEqual(response.body.message, 'Furniture not found');
});

test('should return a 400 error because integer is not a proper type of furniture', async () => {

    let newInvalidFurniture = {
        type: 123,
        length: 1,
        width: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Furniture type is required and must be a string.');
});

test('should return a 400 error because string is not a valid length input', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 'one',
        width: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Furniture length is required and must be a positive integer');
});

test('should return a 400 error because string is not a valid width input', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: 'one',
        height: 1
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Furniture width is required and must be a positive integer');
});

test('should return a 400 error because string is not a valid height input', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: 1,
        height: 'one'
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Furniture height is required and must be a positive integer');
});

test('should return a 400 error because empty input is not a valid length input', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        width: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Furniture length is required and must be a positive integer');
});

test('should return a 400 error because empty input is not a valid width input', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        height: 1
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Furniture width is required and must be a positive integer');
});

test('should return a 400 error because empty input is not a valid height input', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: 1,
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400);
    
    assert.strictEqual(response.body.error, 'Furniture height is required and must be a positive integer');
});

test('should return a 400 error because null value is not a valid type input', async () => {
    let newInvalidFurniture = {
        type: null,
        length: 1,
        width: 1,
        height: 2
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400)

    assert.strictEqual(response.body.error, 'Furniture type is required and must be a string.');
});

test('should return a 400 error because null value is not a valid length input', async () => {
    let newInvalidFurniture = {
        type: 'chair',
        length: null,
        width: 1,
        height: 2
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400)

    assert.strictEqual(response.body.error, 'Furniture length is required and must be a positive integer');
});

test('should return a 400 error because null value is not a valid width input', async () => {
    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: null,
        height: 2
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400)

    assert.strictEqual(response.body.error, 'Furniture width is required and must be a positive integer');
});

test('should return a 400 error because null value is not a valid height input', async () => {
    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: 1,
        height: null
    };

    response = await request(app)
        .post('/api/furniture/')
        .send(newInvalidFurniture)
        .expect(400)

    assert.strictEqual(response.body.error, 'Furniture height is required and must be a positive integer');
});

// updateFurniture tests =============================================================================
test('should return a 400 error because type is required to be a string', async () => {

    let newInvalidFurniture = {
        type: 123,
        length: 1,
        width: 1,
        height: 1
    };

    response = await request(app)
        .put('/api/furniture/1')
        .send(newInvalidFurniture)
        .expect(400)

        assert.strictEqual(response.body.error, 'Furniture type update must be a string.');
});

test('should return a 400 error because length needs to be a valid positive integer', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 'one',
        width: 1,
        height: 1
    };

    response = await request(app)
        .put('/api/furniture/1')
        .send(newInvalidFurniture)
        .expect(400)

        assert.strictEqual(response.body.error, 'Furniture length update must be a valid positive integer');
});

test('should return a 400 error because width needs to be a valid positive integer', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: 'one',
        height: 1
    };

    response = await request(app)
        .put('/api/furniture/1')
        .send(newInvalidFurniture)
        .expect(400)

        assert.strictEqual(response.body.error, 'Furniture width update must be a valid positive integer');
});

test('should return a 400 error because height needs to be a valid positive integer', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: 1,
        height: 'one'
    };

    response = await request(app)
        .put('/api/furniture/1')
        .send(newInvalidFurniture)
        .expect(400)

        assert.strictEqual(response.body.error, 'Furniture height update must be a valid positive integer');
});

test('should return a 400 error because length needs to be a valid positive integer', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: null,
        width: 1,
        height: 1
    };

    response = await request(app)
        .put('/api/furniture/1')
        .send(newInvalidFurniture)
        .expect(400)

        assert.strictEqual(response.body.error, 'Furniture length update must be a valid positive integer');
});

test('should return a 400 error because width needs to be a valid positive integer', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: null,
        height: 1
    };

    response = await request(app)
        .put('/api/furniture/1')
        .send(newInvalidFurniture)
        .expect(400)

        assert.strictEqual(response.body.error, 'Furniture width update must be a valid positive integer');
});

test('should return a 400 error because height needs to be a valid positive integer', async () => {

    let newInvalidFurniture = {
        type: 'chair',
        length: 1,
        width: 1,
        height: null
    };

    response = await request(app)
        .put('/api/furniture/1')
        .send(newInvalidFurniture)
        .expect(400)

        assert.strictEqual(response.body.error, 'Furniture height update must be a valid positive integer');
});

// deleteFurniture tests =============================================================================
test('should return a 404 error because 50 is not a valid furniture', async () => {

    response = await request(app)
        .delete('/api/furniture/50')
        .expect(404)

    assert.strictEqual(response.body.message, 'Furniture not found');
});

test('should return a 404 error because null is not a valid furniture', async () => {

    response = await request(app)
        .delete('/api/furniture/null')
        .expect(404)

    assert.strictEqual(response.body.message, 'Furniture not found');
});

test('should return a 404 error because one is not a valid furniture', async () => {

    response = await request(app)
        .delete('/api/furniture/one')
        .expect(404)

    assert.strictEqual(response.body.message, 'Furniture not found');
});