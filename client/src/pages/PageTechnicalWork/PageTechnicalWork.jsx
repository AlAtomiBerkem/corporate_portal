import React from 'react';
import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../../components/AppNavbar/AppNavbar.jsx";
import AppFooter from "../../components/AppFooter/AppFooter.jsx";

import './PageTechnicalWorkStyle.css'

const PageTechnicalWork = () => {
    return (
        <div>
            <AppHeader />
            <AppNavbar />
            <main className="maintenance-page">
                <div className="maintenance-page__content">
                    <h1 className="maintenance-page__title">Технические работы</h1>
                    <p className="maintenance-page__description">На сайте ведутся технические работы. Приносим извинения за временные неудобства!</p>
                    <a href="/" className="maintenance-page__button">Вернуться на главную</a>
                </div>
            </main>
            <AppFooter />
        </div>
    );
};

export default PageTechnicalWork;