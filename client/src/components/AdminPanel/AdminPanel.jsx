import React, { useState, useEffect } from 'react';
import NewsEditor from '../NewsEditor/NewsEditor.jsx';
import DocumentUploader from '../DocumentUploader/DocumentUploader.jsx';
import './AdminPanel.css';

export default function AdminPanel() {
    const [news, setNews] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('news');
    const [showAddPanel, setShowAddPanel] = useState(false);

    const fetchNews = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/news');
            if (!res.ok) throw new Error('Ошибка загрузки новостей');
            const data = await res.json();
            setNews(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchDocuments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/documents');
            if (!res.ok) throw new Error('Ошибка при загрузке документов');
            const data = await res.json();
            setDocuments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkToken = () => {
            const expires = localStorage.getItem('token_expires');
            if (expires && Date.now() > parseInt(expires)) {
                alert('Сессия истекла. Войдите снова.');
                localStorage.removeItem('admin_token');
                window.location.href = '/login';
            }
        };

        checkToken();
        const interval = setInterval(checkToken, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchNews();
        fetchDocuments();
    }, []);

    const handleDeleteNews = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/news/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
                }
            });

            if (!res.ok) throw new Error('Ошибка удаления новости');
            setNews(news.filter(item => item._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddNews = async (newItem) => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
                },
                body: JSON.stringify(newItem)
            });

            if (!res.ok) throw new Error('Ошибка добавления новости');
            const createdItem = await res.json();
            setNews([...news, createdItem]);
            setShowAddPanel(false);
        } catch (err) {
            setError(err.message);
        }
    };



    const handleDeleteDocument = async (id) => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Ошибка удаления документа');
            setDocuments(documents.filter(item => item._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddDocument = async (formData) => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch('http://localhost:5000/api/documents', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Ошибка добавления документа');
            }

            const createdDoc = await res.json();
            setDocuments([...documents, createdDoc]);
            setShowAddPanel(false);
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const handleDownloadDocument = (id) => {
        window.open(`http://localhost:5000/api/documents/${id}/download`, '_blank');
    };

    return (
        <div className="admin-panel">
            <div className="panel-header">
                <div className="panel-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => setActiveTab('news')}
                    >
                        Новости
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                        onClick={() => setActiveTab('documents')}
                    >
                        Документы
                    </button>
                </div>

                <button
                    className="add-btn"
                    onClick={() => setShowAddPanel(!showAddPanel)}
                    disabled={isLoading}
                >
                    <span>+</span>
                </button>
            </div>

            {error && (
                <div className="error-message" onClick={() => setError('')}>
                    {error}
                </div>
            )}

            {showAddPanel && activeTab === 'news' && (
                <NewsEditor
                    onAdd={handleAddNews}
                    onCancel={() => setShowAddPanel(false)}
                />
            )}

            {showAddPanel && activeTab === 'documents' && (
                <DocumentUploader
                    onUpload={handleAddDocument}
                    onCancel={() => setShowAddPanel(false)}
                />
            )}

            {activeTab === 'news' ? (
                isLoading ? (
                    <div className="loading">Загрузка новостей...</div>
                ) : (
                    <div className="news-list">
                        {news.length === 0 ? (
                            <p className="empty-message">Новостей пока нет</p>
                        ) : (
                            news.map(item => (
                                <div key={item._id} className="news-card">
                                    <h3>{item.title}</h3>
                                    <p>{item.content}</p>
                                    <div className="news-meta">
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                        <button
                                            onClick={() => handleDeleteNews(item._id)}
                                            className="delete-btn"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )
            ) : (
                <div className="documents-section">
                    {isLoading ? (
                        <div className="loading">Загрузка документов...</div>
                    ) : (
                        <div className="documents-list">
                            {documents.length === 0 ? (
                                <p className="empty-message">Раздел документов пуст</p>
                            ) : (
                                documents.map(doc => (
                                    <div key={doc._id} className="document-card">
                                        <div className="document-info">
                                            <h3>{doc.name}</h3>
                                            <p className="document-meta">
                                                {doc.description && <span>{doc.description}</span>}
                                                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                                <span>{Math.round(doc.size / 1024)} KB</span>
                                                <span>Скачиваний: {doc.downloadCount}</span>
                                            </p>
                                        </div>
                                        <div className="document-actions">
                                            <button
                                                onClick={() => handleDownloadDocument(doc._id, doc.name + doc.originalName.substring(doc.originalName.lastIndexOf('.')))}
                                                className="download-btn"
                                            >
                                                Скачать
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDocument(doc._id)}
                                                className="delete-btn"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}