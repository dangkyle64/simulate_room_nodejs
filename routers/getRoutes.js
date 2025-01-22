const express  = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.json({ message: "GET request to /api/get "});
});

router.get('/hello', (request, response) => {
    response.json({ message: "GET request to /api/get/hello"})
});

module.exports = router;