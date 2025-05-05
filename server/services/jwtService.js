const jwt = require('jsonwebtoken');
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

class JWTService {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }

    static verifyAccess(token) {
        return jwt.verify(token, ACCESS_SECRET);
    }

    static verifyRefresh(token) {
        return jwt.verify(token, REFRESH_SECRET);
    }
}

module.exports = JWTService;