const express = require('express');
const router = express.Router();
const { getAllRoomsController, getRoomByIdController, addRoomController, updateRoomController, deleteRoomController } = require('../controllers/roomController');

router.get('/', getAllRoomsController);
router.get('/:id',  getRoomByIdController);
router.post('/', addRoomController);
router.put('/:id', updateRoomController);
router.delete('/:id', deleteRoomController);

module.exports = router;