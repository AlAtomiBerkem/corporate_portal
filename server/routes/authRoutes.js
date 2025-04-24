const router = require("express").Router();
const adminController = require("../controllers/authController");
const { checkAuth, checkAdmin } = require('../middleware/auth');

router.get('/dashboard', checkAuth, checkAdmin, adminController.getDashboard)
router.post('/ban-user', checkAuth, checkAdmin, adminController.banUser);

module.exports = router;
