import ContentSection from '../../../hooks/useContentSection.jsx';
import NewsForm from '../createContentComp/NewsForm.jsx';
import { publicApi } from "../../../api/publicApi.js";
import { adminApi } from "../../../api/adminApi.js";
import '../styles/NewsSection.css';

const NewsSection = () => {
    const renderNewsCard = (newsItem) => (
        <>
            <h3 className="news-title">{newsItem.title}</h3>
            <div
                className="news-content"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
        </>
    );

    return (
        <ContentSection
            apiMethods={{
                get: publicApi.getNews,
                create: adminApi.createNews,
                update: adminApi.updateNews,
                delete: adminApi.deleteNews
            }}
            formComponent={NewsForm}
            cardContentRender={renderNewsCard}
            addButtonText="+ Добавить новость"
            pageTitle="Новости"
            emptyStateText="Новостей пока нет"
            sectionClassName="news-section"
            listClassName="news-list"
            footerClassName="news-footer"
            dateClassName="news-date"
            actionsClassName="news-actions"
        />
    );
};

export default NewsSection;