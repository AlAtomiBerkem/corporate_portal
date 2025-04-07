import React from 'react';
import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../../components/AppNavbar/AppNavbar.jsx";
import AppFooter from "../../components/AppFooter/AppFooter.jsx";
import {Link} from "react-router-dom";

import './PageNotFoundStyle.css'

const PageNotFound = () => {
    return (
        <div>
            <AppHeader />
            <AppNavbar />
            <main className="error-page">
                <div className="error-page__content">
                    <h1 className="error-page__title">404</h1>
                    <p className="error-page__description">Упс! Страница, которую вы ищете, не существует.</p>
                    <Link to="/" className="error-page__button">Вернуться на главную</Link>
                </div>
            </main>
            <AppFooter />
        </div>
    );
};

export default PageNotFound;