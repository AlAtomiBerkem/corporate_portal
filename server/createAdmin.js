const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./model/admin');
require('dotenv').config();

async function createAdmin() {
    try {
        // Подключение к БД
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // Проверяем, есть ли уже админы
        const existingAdmin = await Admin.findOne({ login: 'admin' });
        if (existingAdmin) {
            console.log('Администратор уже существует');
            return;
        }

        // Хешируем пароль
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('admin123', saltRounds);

        // Создаём админа
        const admin = new Admin({
            login: 'admin',
            password: hashedPassword
        });

        await admin.save();
        console.log('Администратор создан:');
        console.log(`Логин: admin`);
        console.log(`Пароль: admin123`);

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        mongoose.disconnect();
    }
}

createAdmin();