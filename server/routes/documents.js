const express = require('express');
const router = express.Router();
const path = require('path');

const documents = [
    { id: 1, name: 'положение инженерных систем 22.01.2025', filename: 'положение инженерные систем 22.01.2025.doc' },
    { id: 2, name: 'Тарифы Инженерные Решения', filename: 'Тариф Инженерные Решения.pdf' }
];

// Получить список документов
router.get('/api/documents', (req, res) => {
    res.json(documents);
});

// Скачать конкретный документ
router.get('/api/documents/:id', (req, res) => {
    const doc = documents.find(d => d.id === parseInt(req.params.id));
    if (!doc) return res.status(404).send('Документ не найден');

    const filePath = path.join(__dirname, '../documents', doc.filename);
    res.download(filePath, doc.name + '.pdf || .doc', (err) => {
        if (err) console.error('Ошибка загрузки:', err);
    });
});

module.exports = router;