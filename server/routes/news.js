const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Получить все новости (сортировка по дате, новые сначала)
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка загрузки новостей' });
    }
});

// Получить конкретную новость
router.get('/:id', async (req, res) => {
    try {
        const newsItem = await News.findById(req.params.id);
        if (!newsItem) return res.status(404).json({ message: 'Новость не найдена' });
        res.json(newsItem);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка загрузки новости' });
    }
});

module.exports = router;