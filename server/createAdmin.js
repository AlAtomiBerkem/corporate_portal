const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Admin = require('./model/admin');
require('dotenv').config();

async function createAdmin() {
    try {
        // Подключение к БД
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // удаляем админа который уже существует
        await Admin.deleteMany({ login: 'admin' });

        // Хешируем пароль
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash('*********', saltRounds);

        // Создаём админа
        const admin = new Admin({
            login: 'admin',
            password: hashedPassword
        });

        await admin.save();
        console.log('Администратор создан:');

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        mongoose.disconnect();
    }
}

createAdmin();