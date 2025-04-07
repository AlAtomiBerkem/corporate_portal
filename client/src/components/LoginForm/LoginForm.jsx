import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppFooter from "../AppFooter/AppFooter.jsx";
import './LoginFormStyle.css'

export default function LoginForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Ошибка авторизации');

            const { token, expiresIn } = await res.json();

            localStorage.setItem('admin_token', token);
            localStorage.setItem('token_expires', Date.now() + expiresIn * 1000);

            navigate('/admin');
        } catch {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-content">
                    <h2 className="login-title">Вход в систему</h2>
                    {error && <p className="login-error">{error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Логин"
                            className="login-input"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="login-input"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                        <button type="submit" className="login-button">Войти</button>
                    </form>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}