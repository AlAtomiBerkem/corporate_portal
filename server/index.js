const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, );
        app.listen(process.env.PORT || 3000, () => console.log('Сервер запущен на порту - ' + process.env.PORT));
    } catch (e) {
        console.error(e);
    }
}

start();