import { useState, useEffect } from 'react';

export default function useAuth() {
    const [token, setToken] = useState(localStorage.getItem('admin_token'));
    const [expires, setExpires] = useState(localStorage.getItem('token_expires'));

    const updateToken = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/refresh', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error();

            const { token: newToken, expiresIn } = await res.json();

            localStorage.setItem('admin_token', newToken);
            localStorage.setItem('token_expires', Date.now() + expiresIn * 1000);

            setToken(newToken);
            setExpires(Date.now() + expiresIn * 1000);

            return true;
        } catch {
            logout();
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('token_expires');
        setToken(null);
        setExpires(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const checkAuth = async () => {
            if (!token || !expires) return logout();

            // Если токен истекает через 5 минут (300000 мс)
            if (expires - Date.now() < 300000) {
                const refreshed = await updateToken();
                if (!refreshed) return;
            }
        };

        checkAuth();
        const interval = setInterval(checkAuth, 60000); // Проверка каждую минуту

        return () => clearInterval(interval);
    }, [token, expires]);

    return { token, updateToken, logout };
}