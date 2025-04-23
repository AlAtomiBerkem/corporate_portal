const router = require("express").Router();
const controller = require("../controllers/authController");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/news", controller.news);

module.exports = router;