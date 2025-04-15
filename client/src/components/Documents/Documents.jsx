import React, { useState, useEffect } from 'react';
import './DocumentsStyle.css';
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppNavbar from "../AppNavbar/AppNavbar.jsx";
import AppFooter from "../AppFooter/AppFooter.jsx";

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

                const response = await fetch('http://localhost:5000/api/documents', {
                    headers
                });

                if (!response.ok) throw new Error('Ошибка загрузки документов');
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Ошибка загрузки документов:', error);
                setError('Не удалось загрузить документы. Пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleDownload = (id) => {
        window.open(`http://localhost:5000/api/documents/${id}/download`, '_blank');
    };

    return (
        <div className="documents-page">
            <AppHeader />
            <AppNavbar />
            <main className="documents-container">
                <div className="documents-header">
                    <h1>Документы</h1>
                    <p>Официальные документы и материалы для скачивания</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-message">
                        <p>Загрузка документов...</p>
                    </div>
                ) : documents.length === 0 ? (
                    <div className="no-documents">
                        <p>Документы не найдены</p>
                    </div>
                ) : (
                    <div className="documents-list">
                        {documents.map(doc => (
                            <div key={doc._id} className="document-card">
                                <div className="document-info">
                                    <h3>{doc.name}</h3>
                                    <div className="document-meta">
                                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                                        <span>{Math.round(doc.size / 1024)} KB</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDownload(doc._id)}
                                    className="download-btn"
                                >
                                    Скачать
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <AppFooter />
        </div>
    );
};

export default Documents;