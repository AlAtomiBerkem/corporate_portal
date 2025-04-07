import { useEffect, useState } from 'react';
import './NewsListStyle.css'

export default function NewsList() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/news')
            .then(res => res.json())
            .then(data => setNews(data));
    }, []);

    return (
        <div className="news-list">
            <h1>Новости</h1>
            {news.map(item => (
                <article key={item._id}>
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                    <time>{new Date(item.createdAt).toLocaleDateString()}</time>
                </article>
            ))}
        </div>
    );
}