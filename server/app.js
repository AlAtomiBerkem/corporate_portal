const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const documentsRouter = require('./routes/documents');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/react-blog')
    .then(() => console.log('✅ Подключено к MongoDB'))
    .catch(err => console.error('❌ Ошибка подключения:', err));

// Инициализация админа
const initializeAdmin = require('./initAdmin');
initializeAdmin();

// Импорт контроллеров
const authController = require('./controllers/auth');

// Основные маршруты
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Маршруты авторизации
app.post('/api/admin/login', authController.login);
app.post('/api/admin/refresh', authController.refreshToken);

// Маршруты API
const newsRouter = require('./routes/news');
const adminRouter = require('./routes/admin');
app.use('/api/news', newsRouter);    // Публичные маршруты
app.use('/api/admin', adminRouter);  // Защищенные маршруты
app.use('/', documentsRouter); // документы

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});