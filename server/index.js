const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Маршруты аутентификации
app.use('/auth', require('./routes/auth'));

// Маршруты администратора
app.use('/admin', require('./routes/admin'));

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 3000, () => console.log('Сервер запущен на порту - ' + process.env.PORT));
    } catch (e) {
        console.error(e);
    }
}

start();