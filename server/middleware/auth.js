const JWTService = require('../services/jwtService');

module.exports = {
    // Проверка Access Token
    checkAuth: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Нет токена' });

        try {
            req.user = JWTService.verifyAccess(token);
            next();
        } catch (e) {
            res.status(401).json({ message: 'Токен недействителен' });
        }
    },

    // Проверка роли админа
    checkAdmin: (req, res, next) => {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ message: 'Доступ запрещён' });
        }
        next();
    }
};