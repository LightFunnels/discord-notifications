const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const verifyToken = require('../middlewares/verifyToken');

// Create a new channel
router.post('/', verifyToken, channelController.createChannel);

// Get all channels
router.get('/', verifyToken, channelController.getAllChannels);

// Get a specific channel
router.get('/:id', verifyToken, channelController.getChannelById);

// Update a channel
router.put('/:id', verifyToken, channelController.updateChannel);

// Delete a channel
router.delete('/:id', verifyToken, channelController.deleteChannel);

module.exports = router;
