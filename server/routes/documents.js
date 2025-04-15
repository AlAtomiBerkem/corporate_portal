const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authController = require('../controllers/auth');
const upload = require('../config/multerConfig');

// Защищенные маршруты (требуют авторизации)
router.use(authController.verifyToken);

// Получить все документы
router.get('/', documentController.getAllDocuments);

// Скачать документ
router.get('/:id/download', documentController.downloadDocument);

// Загрузить новый документ (только админ)
router.post('/', upload.single('file'), documentController.uploadDocument);

// Удалить документ (только админ)
router.delete('/:id', documentController.deleteDocument);

module.exports = router;