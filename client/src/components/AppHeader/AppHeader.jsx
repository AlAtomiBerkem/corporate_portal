import React from 'react';
import { Link } from 'react-router-dom';
import './AppHeaderStyle.css';
import User from '../../assets/svg/user.jsx';
import Logo from '../../assets/logo10.png';
import { isAuthenticated } from '../../api/auth.js'; // Импортируем функцию проверки аутентификации

const AppHeader = () => {
    const isAuth = isAuthenticated(); // Используем функцию из auth.js

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-logo-name">
                            <div className="header-logo"><img src={Logo} alt="logo"/></div>
                            <p className="header__company-name">Инженерные решения</p>
                        </div>
                        <div className="header__button">
                            <Link to={isAuth ? "/admin" : "/login"}>
                                <button className="header__button-button">
                                    <strong className="button-text">
                                        {isAuth ? "Личный кабинет" : "войти в кабинет"}
                                    </strong>
                                    <User className="button-svg" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default AppHeader;