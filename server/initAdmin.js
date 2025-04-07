const Admin = require('./models/Admin');
const config = require('./config');

async function initializeAdmin() {
    try {
        const adminCount = await Admin.countDocuments();

        if (adminCount === 0) {
            const admin = new Admin({
                username: 'admin',
                password: config.ADMIN_INITIAL_PASSWORD
            });

            await admin.save();
            console.log('Первоначальный администратор создан');
        }
    } catch (err) {
        console.error('Ошибка инициализации администратора:', err);
    }
}

module.exports = initializeAdmin;