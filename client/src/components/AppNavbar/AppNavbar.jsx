import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AppNavbarStyle.css';
import { HashLink } from 'react-router-hash-link';

const AppNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navigate">
            <div className="container">
                <div
                    className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                </div>

                <ul className={`navigate__list ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navigate__item">
                        <Link to="/" className="navigate__link">Главная</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/PageContent" className="navigate__link">Подключение газа</Link>
                    </li>
                    <li className="navigate__item">
                        <HashLink smooth to="/#maintenanceAncor" className="navigate__link">Техническое обслуживание</HashLink>
                    </li>
                    <li className="navigate__item">
                        <Link to="/PageLegal" className="navigate__link">Юридическим лицам</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/documents" className="navigate__link">Прилагающиеся документы</Link>
                    </li>
                    <li className="navigate__item">
                        <HashLink smooth to="/#contactAncor" className="navigate__link">Контакты</HashLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AppNavbar;