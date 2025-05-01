const router = require("express").Router();
const publicController = require("../controllers//publicController");

router.get('/news', publicController.publicNews);
router.get('/docks', publicController.publicDock);

router.get('/legal', publicController.publicLegal);
router.get('/content',  publicController.publicContent);


module.exports = router;