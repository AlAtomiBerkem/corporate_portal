const router = require("express").Router();
const publicController = require("../controllers//publicController");
const { checkAuth, checkAdmin } = require('../middleware/auth');

router.get('/news', checkAdmin, checkAuth, publicController.publicNews);
router.get('/docks', checkAdmin, checkAuth, publicController.publicDock);
router.get('/legal', checkAuth, checkAdmin, publicController.publicLegal);
router.get('/content', checkAdmin, checkAdmin, publicController.publicContent);
