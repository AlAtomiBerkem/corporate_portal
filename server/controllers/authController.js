const JWTService = require('../services/jwtService');
const Admin = require('../model/admin');

class AuthController {

    async login(req, res) {
        try {
            const {login, password} = req.body;

            // 1. Проверка логина/пароля (пример)
            const admin = await Admin.findOne({login});
            if (!admin || !admin.validatePassword(password)) {
                return res.status(401).json({message: 'Неверные данные !'});
            }

            // 2. Генерация токенов
            const payload = {id: admin.id, role: 'admin'};
            const {accessToken, refreshToken} = JWTService.generateTokens(payload);

            // 3. Сохранение Refresh Token в БД
            admin.refreshToken = refreshToken;
            await admin.save();

            // 4. Отправка токенов
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.json({accessToken});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) return res.sendStatus(401);

            // 1. Верификация Refresh Token
            const decoded = JWTService.verifyRefresh(refreshToken);
            const admin = await Admin.findById(decoded.id);

            // 2. Проверка соответствия токена в БД
            if (admin.refreshToken !== refreshToken) {
                return res.status(401).json({message: 'Токен недействителен'});
            }

            // 3. Генерация новых токенов
            const payload = {id: admin.id, role: 'admin'};
            const {accessToken, newRefreshToken} = JWTService.generateTokens(payload);

            // 4. Обновление Refresh Token в БД
            admin.refreshToken = newRefreshToken;
            await admin.save();

            // 5. Отправка новых токенов
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.json({accessToken});
        } catch (e) {
            res.status(401).json({error: e.message});
        }
    }

    async logout(req, res) {

    }

}
module.exports = new AuthController();