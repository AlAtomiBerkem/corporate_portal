const express = require('express');
const router = express.Router();
const News = require('../models/News');
const authController = require('../controllers/auth');

// Все маршруты ниже требуют авторизации
router.use(authController.verifyToken);

// Создать новость
router.post('/news', async (req, res) => {
    try {
        const newsItem = new News({
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.imageUrl
        });

        const savedNews = await newsItem.save();
        res.status(201).json(savedNews);
    } catch (err) {
        res.status(400).json({ message: 'Ошибка создания новости' });
    }
});

// Обновить новость
router.put('/news/:id', async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content,
                imageUrl: req.body.imageUrl,
                updatedAt: Date.now()
            },
            { new: true }
        );
        res.json(updatedNews);
    } catch (err) {
        res.status(400).json({ message: 'Ошибка обновления новости' });
    }
});

// Удалить новость
router.delete('/news/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'Новость удалена' });
    } catch (err) {
        res.status(400).json({ message: 'Ошибка удаления новости' });
    }
});

module.exports = router;