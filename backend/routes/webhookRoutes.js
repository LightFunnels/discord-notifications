const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/wehbookController');

// Create a new channel
router.post('/order', webhookController.orderWebhook);

// Get all channels
router.post('/uninstall', webhookController.uninstallWebhook);

module.exports = router;
