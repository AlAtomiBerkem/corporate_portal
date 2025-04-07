import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AppNavbarStyle.css';

const AppNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navigate">
            <div className="container">
                {/* Бургер-меню с обработчиком клика */}
                <div
                    className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                </div>

                {/* Список навигации с динамическим классом */}
                <ul className={`navigate__list ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navigate__item">
                        <Link to="/" className="navigate__link">Главная</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/PageContent" className="navigate__link">Подключение газа</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/#maintenanceAncor" className="navigate__link">Техническое обслуживание</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/PageContent" className="navigate__link">Юридическим лицам</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/documents" className="navigate__link">Прилагающиеся документы</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/#contactAncor" className="navigate__link">Контакты</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AppNavbar;