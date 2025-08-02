const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./model/admin');
require('dotenv').config();

async function changeAdminPassword() {
    try {
        // Подключение к БД
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // Находим администратора
        const admin = await Admin.findOne({ login: 'admin' });
        if (!admin) {
            console.log('Администратор не найден');
            return;
        }

        // Новый пароль (можно изменить здесь)
        const newPassword = 'newSecurePassword123!';
        
        // Хешируем новый пароль
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Обновляем пароль
        admin.password = hashedPassword;
        await admin.save();
        
        console.log('Пароль администратора изменен:');
        console.log(`Логин: admin`);
        console.log(`Новый пароль: ${newPassword}`);

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        mongoose.disconnect();
    }
}

changeAdminPassword(); 