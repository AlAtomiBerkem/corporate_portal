import { useState, useEffect } from 'react';
import NewsEditor from '../NewsEditor/NewsEditor.jsx';
import './AdminPanel.css';

export default function AdminPanel() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('news');
    const [showAddPanel, setShowAddPanel] = useState(false);

    const fetchNews = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/news');
            if (!res.ok) throw new Error('Ошибка загрузки');
            const data = await res.json();
            setNews(data);
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
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/news/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
                }
            });

            if (!res.ok) throw new Error('Ошибка удаления');
            setNews(news.filter(item => item._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAdd = async (newItem) => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
                },
                body: JSON.stringify(newItem)
            });

            if (!res.ok) throw new Error('Ошибка добавления');
            const createdItem = await res.json();
            setNews([...news, createdItem]);
        } catch (err) {
            setError(err.message);
        }
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
                >
                    <span>+</span>
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showAddPanel && activeTab === 'news' && <NewsEditor onAdd={handleAdd} />}

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
                                            onClick={() => handleDelete(item._id)}
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
                    <p className="empty-message">Раздел документов в разработке</p>
                </div>
            )}
        </div>
    );
}