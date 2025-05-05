export const API_URL = {
    ADDRESS: 'http://localhost:5000',
};

export const LOCALSTORAGE_KEY = {
    ACCESS_TOKEN: 'access_token',
}

export const USER_ROLES = {
    ADMIN: 'admin',
}

export const TOKEN_EXPIRATION = {
    ACCESS: 30 * 60 * 1000, // 30 минут в мс
    REFRESH: 7 * 24 * 60 * 60 * 1000, // 7 дней в мс
};