const express = require('express');
const router = express.Router();
const { getAllFurnituresController, getFurnitureByIdController, addFurnitureController } = require('../controllers/furnitureController');

router.get('/', getAllFurnituresController);
router.get('/:id', getFurnitureByIdController);
router.post('/', addFurnitureController);

module.exports = router;