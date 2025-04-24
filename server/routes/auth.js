const router = require('express').Router();
const authController = require('../controllers/authController');

// POST /auth/login → вызывает authController.login
router.post('/login', authController.login);

// POST /auth/refresh → вызывает authController.refresh
router.post('/refresh', authController.refresh);

module.exports = router;