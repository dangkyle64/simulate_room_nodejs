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

test('should return a 404 error because string is not a valid id', async () => {

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
    
    console.log('Response: ', response.body);
    assert.strictEqual(response.body.error, 'Furniture type is required and must be a string.');
});

