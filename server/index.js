const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload  = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload ({}))

app.use('/auth', require('./routes/auth'));

app.use('/admin', require('./routes/admin'));

app.use('/public', require('./routes/publicRoutes'));

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