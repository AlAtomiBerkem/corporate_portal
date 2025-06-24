import React, { useState, useEffect } from 'react';
import './DocumentsStyle.css';
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppNavbar from "../AppNavbar/AppNavbar.jsx";
import AppFooter from "../AppFooter/AppFooter.jsx";
import { publicApi } from '../../api/publicApi.js';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [downloadingId, setDownloadingId] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                setError(null);
                const docs = await publicApi.getDocuments();
                setDocuments(Array.isArray(docs) ? docs : []);
            } catch (error) {
                setError('Не удалось загрузить документы. Пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    const handleDownload = async (id, originalName) => {
        if (!id) {
            setError('Не указано имя файла для скачивания');
            return;
        }
        try {
            setDownloadingId(id);
            const response = await publicApi.getLoadingDocuments(id);
            if (!response) throw new Error('Не удалось получить файл');
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', originalName || id);
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            setError(error.message || 'Ошибка при скачивании файла');
        } finally {
            setDownloadingId(null);
        }
    };

    const formatFileSize = (bytes) => {
        if (typeof bytes !== 'number' || bytes <= 0) return '0 KB';
        return Math.round(bytes / 1024) + ' KB';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    const filteredDocuments = documents.filter(doc => {
        const search = searchTerm.toLowerCase();
        return (
            (doc.title && doc.title.toLowerCase().includes(search)) ||
            (doc.originalName && doc.originalName.toLowerCase().includes(search))
        );
    });

    return (
        <div className="documents-page">
            <AppHeader />
            <AppNavbar />
            <main className="documents-container">
                <div className="documents-header">
                    <h1>Документы</h1>
                    <p>Официальные документы и материалы для скачивания</p>
                </div>
                <div className="documents-controls">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Поиск по названию или имени файла..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>
                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={() => window.location.reload()} className="reset-btn">
                            Обновить страницу
                        </button>
                    </div>
                )}
                {loading ? (
                    <div className="loading-indicator">
                        <div className="loading-spinner"></div>
                        <p>Загрузка списка документов...</p>
                    </div>
                ) : filteredDocuments.length === 0 ? (
                    <div className="no-documents">
                        <p>{searchTerm ? 'Документы не найдены' : 'Документы отсутствуют'}</p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="reset-btn"
                            >
                                Сбросить поиск
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="documents-table-container">
                        <table className="documents-table">
                            <thead>
                            <tr>
                                <th>Название</th>
                                <th>Дата</th>
                                <th>Размер</th>
                                <th style={{background: '#025178', color: '#025178'}}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredDocuments.map(doc => (
                                <tr key={doc.id}>
                                    <td className="document-title">{doc.title}</td>
                                    <td className="document-date">{formatDate(doc.uploadedAt)}</td>
                                    <td className="document-size">{formatFileSize(doc.size)}</td>
                                    <td className="document-actions">
                                        <button
                                            className="download-btn"
                                            onClick={() => handleDownload(doc.id, doc.originalName)}
                                            disabled={downloadingId === doc.id}
                                        >
                                            {downloadingId === doc.id ? 'Скачивание...' : 'Скачать'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            <AppFooter />
        </div>
    );
};

export default Documents;