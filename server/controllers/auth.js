const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.refreshToken = async (req, res) => {
    try {
        const oldToken = req.headers['authorization']?.split(' ')[1];
        if (!oldToken) return res.status(401).json({ message: 'Токен отсутствует' });

        const decoded = jwt.verify(oldToken, config.JWT_SECRET, { ignoreExpiration: true });

        const newToken = jwt.sign(
            { id: decoded.id },
            config.JWT_SECRET,
            { expiresIn: '10h' }
        );

        res.json({
            token: newToken,
            expiresIn: 3600
        });
    } catch (err) {
        res.status(401).json({ message: 'Недействительный токен' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        // Проверяем пароль
        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        // Создаем JWT токен
        const token = jwt.sign(
            { id: admin._id },
            config.JWT_SECRET,
            { expiresIn: '4h' } // 4 часа - оптимальное время
        );

        res.json({
            token,
            expiresIn: 4 * 60 * 60
        });

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Проверка авторизации (middleware)
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Берём часть после "Bearer"

    if (!token) {
        return res.status(403).json({ message: 'Требуется авторизация' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT Error:', err); // Логируем ошибку
            return res.status(401).json({
                message: 'Недействительный токен',
                error: err.message // Добавляем детали ошибки
            });
        }
        req.userId = decoded.id;
        next();
    });
};