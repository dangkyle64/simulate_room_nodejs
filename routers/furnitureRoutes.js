const express = require('express');
const router = express.Router();
const { getAllFurnituresController, getFurnitureByIdController, addFurnitureController, deleteFurnitureController, updateFurnitureController } = require('../controllers/furnitureController');

router.get('/', getAllFurnituresController);
router.get('/:id', getFurnitureByIdController);
router.post('/', addFurnitureController);
router.put('/:id', updateFurnitureController);
router.delete('/:id', deleteFurnitureController);

module.exports = router;