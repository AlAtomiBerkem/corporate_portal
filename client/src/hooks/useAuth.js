import { useState, useEffect } from "react";
import { refresh, logout, login } from "../api/auth.js";
import { LOCALSTORAGE_KEY } from "../utils/constants.js";

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
                if (token) {
                    await refresh(); // Проверяем валидность токена
                    setIsAuth(true);
                }
            } catch {
                setIsAuth(false);
            }
        };
        checkAuth();
    }, []);

    return { isAuth, login, logout };
};