const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// const documentsRouter = require('./routes/documents');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Укажите ваш фронтенд-адрес
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/react-blog', {
    serverSelectionTimeoutMS: 5000, // 5 сек на подключение
    socketTimeoutMS: 30000, // 30 сек на запрос
})
    .then(() => console.log('✅ Подключено к MongoDB'))
    .catch(err => console.error('❌ Ошибка подключения:', err));

// const initializeAdmin = require('./initAdmin');
// initializeAdmin();

const authController = require('./controllers/auth');



app.get('/', (req, res) => {
    res.send('Server is running');
});

// Маршруты авторизации
app.post('/api/admin/login', authController.login);
app.post('/api/admin/refresh', authController.refreshToken);

// Маршруты API
const newsRouter = require('./routes/news');
const adminRouter = require('./routes/admin');
const documentRoutes = require('./routes/documents');

// const documentRoutes = require('./routes/documents');
app.use('/api/news', newsRouter);    // Публичные маршруты
app.use('/api/admin', adminRouter);  // Защищенные маршруты
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/documents', documentRoutes);
// app.use('/', documentsRouter); // документы
// app.use('/api/documents', documentRoutes);
// Добавьте после других роутов
// app.use('/api/documents', documentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});