const express = require('express');
const router = express.Router();
const { getAllRoomsController, getRoomByIdController, addRoomController } = require('../controllers/roomController');

router.get('/', getAllRoomsController);
router.get('/:id',  getRoomByIdController);
router.post('/', addRoomController);

module.exports = router;