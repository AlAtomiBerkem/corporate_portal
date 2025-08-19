import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AppNavbarStyle.css';
import { HashLink } from 'react-router-hash-link';

const AppNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleContactsClick = (e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollToBottom: true } });
        } else {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        }
    };

    const handleMaintenanceClick = (e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const anchorId = 'maintenanceAncor';
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollToId: anchorId } });
        } else {
            const el = document.getElementById(anchorId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
                        <Link to="/" onClick={handleMaintenanceClick} className="navigate__link">Техническое обслуживание</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/PageLegal" className="navigate__link">Юридическим лицам</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/documents" className="navigate__link">Прилагающиеся документы</Link>
                    </li>
                    <li className="navigate__item">
                        <Link to="/" onClick={handleContactsClick} className="navigate__link">Контакты</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AppNavbar;