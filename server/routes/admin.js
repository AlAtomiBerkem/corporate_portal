const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { checkAuth, checkAdmin } = require('../middleware/auth');

router.post('/create/news', checkAuth, checkAdmin, adminController.createNews);
router.patch('/update/news/:id', checkAuth, checkAdmin, adminController.upDateNews);
router.delete('/delete/news/:id', checkAuth, checkAdmin, adminController.deleteNews);

router.post('/create/legal', checkAuth, checkAdmin, adminController.createLegalInformation);
router.patch('/update/legal/:id', checkAuth, checkAdmin, adminController.updateLegalInformation);
router.delete('/delete/legal/:id', checkAuth, checkAdmin, adminController.deleteLegalInformation);

router.post('/docs', checkAuth, checkAdmin, adminController.addDocument);
router.delete('/docs/:id', checkAuth, checkAdmin, adminController.deleteDocument);

router.post('/content', checkAuth, checkAdmin, adminController.createLegalInformation);
router.patch('/content/:id', checkAuth, checkAdmin, adminController.updateLegalInformation);
router.delete('/content/:id', checkAuth, checkAdmin, adminController.deleteLegalInformation);

module.exports = router;
