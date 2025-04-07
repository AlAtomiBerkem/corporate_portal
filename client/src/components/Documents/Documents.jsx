import React, { useState, useEffect } from 'react';
import './DocumentsStyle.css';
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppNavbar from "../AppNavbar/AppNavbar.jsx";
import AppFooter from "../AppFooter/AppFooter.jsx";

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/documents');
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Ошибка загрузки документов:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleDownload = (id) => {
        window.open(`http://localhost:5000/api/documents/${id}`, '_blank');
    };

    return (
        <div className="documents-page">
            <AppHeader />
            <AppNavbar />
            <main className="documents-container">
                <h1>Прилагающиеся документы</h1>

                {loading ? (
                    <p>Загрузка документов...</p>
                ) : (
                    <div className="documents-list">
                        {documents.map(doc => (
                            <div key={doc.id} className="document-card">
                                <h3>{doc.name}</h3>
                                <button
                                    onClick={() => handleDownload(doc.id)}
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