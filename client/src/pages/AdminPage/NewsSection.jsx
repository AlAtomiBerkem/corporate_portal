import './styles/NewsSection.css';
import Card from './Shared/Card';
import { publicApi } from "../../api/publicApi.js";
import { useFetchData } from "../../hooks/useFetchData.js";
import ContentBtn from "../../components/AdmiinNewContentBtn/ContentBtn.jsx";

const NewsSection = () => {

    const {data: news, loading } = useFetchData(publicApi.getNews)
    if (loading) return <div>...загрузка новостей</div>;

    return (

        <div className="news-section">
            <ContentBtn name={'+ Добавить новость'}/>
            <div className="news-list">
                {news.map(item => (
                    <Card key={item._id}>
                        <h3 className="news-title">{item.title}</h3>
                        <p className="news-content">{item.content}</p>
                        <div className="news-footer">
                            <span className="news-date">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                            <div className="news-actions">
                                <button className="btn-edit">Редактировать</button>
                                <button className="btn-delete">Удалить</button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
