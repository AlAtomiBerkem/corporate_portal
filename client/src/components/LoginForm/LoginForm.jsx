import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AppFooter from "../AppFooter/AppFooter.jsx";
import './LoginFormStyle.css';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();  // Используем наш хук

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(formData.login, formData.password);
            navigate('/admin');
        } catch (err) {
            setError('Неверный логин или пароль');
            console.error('Ошибка входа:', err.message);
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
                            value={formData.login}
                            onChange={(e) => setFormData({...formData, login: e.target.value})}
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
                        <button
                            type="submit"
                            className="login-button"
                            disabled={!formData.login || !formData.password}  // Деактивация при пустых полях
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}