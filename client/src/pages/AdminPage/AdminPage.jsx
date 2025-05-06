// import { useNavigate } from 'react-router-dom';
import AdminPanel from '../../components/AdminPanel/AdminPanel.jsx';
import './AdminPage.css';
import Header from "../../components/AppHeader/AppHeader.jsx";
import Navbar from "../../components/AppNavbar/AppNavbar.jsx";
import NewsEditor from "../../components/NewsEditor/NewsEditor.jsx";
import DocumentUploader from "../../components/DocumentUploader/DocumentUploader.jsx";
import React from "react";

// import {logout} from '../../utils/auth.js'

const AdminPage = () => {

    // function handleLogout() {
    //     fetchAPI(logout, 'POST', '/logout')
    // }
    return (
        <div className="admin-layout">
            <Header />
            <Navbar />
            <div className="admin-page">
                <header className="admin-header">
                    <h1 className="admin-title">Кабинет Администратора</h1>
                    <button className="logout-button">
                        Выйти
                    </button>
                </header>
                <main className="admin-content">
                    <div className="admin-panel">
                        <div className="panel-header">
                            <div className="panel-tabs">
                                <button className="tab-btn active">
                                    Новости
                                </button>
                                <button className="tab-btn">
                                    Документы
                                </button>
                            </div>

                            <button className="add-btn">
                                <span>+</span>
                            </button>
                        </div>

                        <div className="error-message" style={{display: 'none'}}>
                            Пример сообщения об ошибке
                        </div>

                        <div style={{display: 'none'}}>
                            <NewsEditor />
                        </div>

                        <div style={{display: 'none'}}>
                            <DocumentUploader />
                        </div>

                        <div className="news-list">
                            <div className="news-card">
                                <h3>Пример заголовка новости</h3>
                                <p>Пример содержания новости</p>
                                <div className="news-meta">
                                    <span>01.01.2023</span>
                                    <button className="delete-btn">
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="documents-section" style={{display: 'none'}}>
                            <div className="documents-list">
                                <div className="document-card">
                                    <div className="document-info">
                                        <h3>Пример документа</h3>
                                        <p className="document-meta">
                                            <span>Описание документа</span>
                                            <span>01.01.2023</span>
                                            <span>100 KB</span>
                                            <span>Скачиваний: 5</span>
                                        </p>
                                    </div>
                                    <div className="document-actions">
                                        <button className="download-btn">
                                            Скачать
                                        </button>
                                        <button className="delete-btn">
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;