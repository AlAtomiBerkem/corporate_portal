const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./model/admin');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function changePasswordInteractive() {
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

        // Запрашиваем новый пароль
        rl.question('Введите новый пароль для администратора: ', async (newPassword) => {
            if (newPassword.length < 6) {
                console.log('Пароль должен содержать минимум 6 символов');
                rl.close();
                return;
            }

            // Хешируем новый пароль
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            // Обновляем пароль
            admin.password = hashedPassword;
            await admin.save();
            
            console.log('✅ Пароль администратора успешно изменен!');
            console.log(`Логин: admin`);
            console.log(`Новый пароль: ${newPassword}`);
            
            rl.close();
            mongoose.disconnect();
        });

    } catch (error) {
        console.error('Ошибка:', error);
        rl.close();
        mongoose.disconnect();
    }
}

changePasswordInteractive(); 