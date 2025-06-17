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

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await publicApi.getDocuments();

                const normalizedDocs = (Array.isArray(response) ? response : (response?.documents || []))
                    .map(doc => ({
                        _id: doc._id || Math.random().toString(),
                        name: doc.name || 'Без названия',
                        fileName: doc.fileName || doc.name || `document_${Date.now()}`,
                        description: doc.description || '',
                        size: typeof doc.size === 'number' ? doc.size : 0,
                        category: doc.category || null,
                        uploadedAt: doc.uploadedAt || doc.createdAt || new Date().toISOString(),
                        downloading: false
                    }));

                setDocuments(normalizedDocs);
            } catch (error) {
                console.error('Ошибка загрузки документов:', error);
                setError('Не удалось загрузить документы. Пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleDownload = async (fileName, documentName) => {
        if (!fileName) {
            setError('Не указано имя файла для скачивания');
            return;
        }

        try {
            setDocuments(docs => docs.map(doc =>
                doc.name === documentName ? { ...doc, downloading: true } : doc
            ));

            const response = await publicApi.getLoadingDocuments(fileName);

            if (!response) {
                throw new Error('Не удалось получить файл');
            }

            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);

        } catch (error) {
            console.error('Ошибка скачивания:', error);
            setError(error.message || 'Ошибка при скачивании файла');
        } finally {
            setDocuments(docs => docs.map(doc =>
                doc.name === documentName ? { ...doc, downloading: false } : doc
            ));
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
        const docName = doc?.name || '';
        const search = searchTerm?.toLowerCase() || '';
        return docName.toLowerCase().includes(search);
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
                            placeholder="Поиск по названию документа..."
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
                                <th>Название документа</th>
                                <th>Описание</th>
                                <th>Дата</th>
                                <th>Размер</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredDocuments.map(doc => (
                                <tr key={doc._id}>
                                    <td className="document-name">{doc.name}</td>
                                    <td className="document-description">{doc.description}</td>
                                    <td className="document-date">{formatDate(doc.uploadedAt)}</td>
                                    <td className="document-size">{formatFileSize(doc.size)}</td>
                                    <td className="document-actions">
                                        <button
                                            className="download-btn"
                                            onClick={() => handleDownload(doc.fileName, doc.name)}
                                            disabled={doc.downloading}
                                        >
                                            {doc.downloading ? 'Скачивание...' : 'Скачать'}
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