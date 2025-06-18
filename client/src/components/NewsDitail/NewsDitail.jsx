import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { publicApi } from "../../api/publicApi.js";
import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../../components/AppNavbar/AppNavbar.jsx";
import AppFooter from "../../components/AppFooter/AppFooter.jsx";
import './NewsDitail.css'

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const response = await publicApi.getNews();
                const foundItem = response.data.find(item => item._id === id);

                if (!foundItem) throw new Error('Новость не найдена');

                setNewsItem({
                    ...foundItem,
                    formattedDate: new Date(foundItem.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                });
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Ошибка загрузки');
                setLoading(false);
            }
        };

        fetchNewsItem();
    }, [id]);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!newsItem) return <div>Новость не найдена</div>;

    return (
        <div className="page-container">
            <AppHeader />
            <AppNavbar />
            <main className="content-wrapper">
                <div className="news-detail">
                    <div className="news-header">
                        <h1>{newsItem.title}</h1>
                        <div className="news-meta">
                            <span className="news-date">{newsItem.formattedDate}</span>
                        </div>
                    </div>

                    <div
                        className="news-content"
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                    />

                    <div className="news-footer">
                        <Link to="/" className="back-button">
                            ← Назад к списку новостей
                        </Link>
                    </div>
                </div>
            </main>
            <AppFooter />
        </div>
    );
};

export default NewsDetail;