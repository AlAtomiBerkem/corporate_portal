import { login } from '../../helpers/Auth.js';
import AppFooter from "../AppFooter/AppFooter.jsx";
import { useState } from "react";
import './LoginFormStyle.css';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [form, setForm] = useState({ login: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.login, form.password);
            navigate('/admin');
        } catch (error) {
            setError(error.message);
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
                            value={form.login}
                            onChange={(e) => setForm({...form, login: e.target.value})}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="login-input"
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            required
                        />
                        <button
                            type="submit"
                            className="login-button">
                            Войти
                        </button>
                    </form>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}