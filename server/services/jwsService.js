const jwt = require('jsonwebtoken');
const {ACCESS_SECRET, REFRESH_SECRET} = require(process.env);

class JWTService {
    static generateTokens(payload) {
        const accessToken = jwt.sing(payload, ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sing(payload, REFRESH_SECRET, {expiresIn: '7d'});
        return {accessToken, refreshToken};
    }

    static verifyAccess(token) {
       return  jwt.verify(token, ACCESS_SECRET);
    }

    static verifyRefresh(token) {
        return jwt.verify(token, REFRESH_SECRET)
    }
}

module.exports = JWTService;