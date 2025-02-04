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
router.post('/image-process', async (request, response) => {
    try {
        const { imageData } = request.body;
        const imagePath = '/tmp/uploaded_image.png';

        // call model and generate the 3D model here

        response.json({
            success: true,
            // data: path to the generated 3D Model
        });
    } catch(error) {
        console.error('Error converting image into 3D Object', error);
        response.status(500).json({ success: false, error: error.message });
    };
});

module.exports = router;