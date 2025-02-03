const express  = require('express');
const router = express.Router();

router.post('/', (request, response) => {
    response.json({ message: "POST request to /api/post" });
});

router.post('', (request, response) => {
    const { length, width, height } = request.body;
    response.json({ message: `Recieved data: Length - ${length}, Width - ${width}, Height - ${height}`});
});

//post router for images '/image-process' or similar 

module.exports = router;