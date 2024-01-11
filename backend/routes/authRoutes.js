const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController');

// Route for '/'
router.get('/', authControllers.auth);

// Route for '/redirect'
router.get('/redirect', authControllers.redirect);

module.exports = router;
