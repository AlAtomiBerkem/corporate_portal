import UseContentSection from '../../../hooks/useContentSection.jsx';
import ContentEditor from '../createContentComp/ContentEditor.jsx';
import { publicApi } from "../../../api/publicApi.js";
import { adminApi } from "../../../api/adminApi.js";
import '../styles/NewsSection.css';
import '../Shared/Card.css'

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
        <UseContentSection
            apiMethods={{
                get: publicApi.getNews,
                create: adminApi.createNews,
                update: adminApi.updateNews,
                delete: adminApi.deleteNews
            }}
            formComponent={(props) => (
                <ContentEditor
                    {...props}
                    apiMethods={{
                        create: adminApi.createNews,
                        update: adminApi.updateNews
                    }}
                    contentType="новость"
                    formTitle={props.initialData ? 'Редактировать новость' : 'Добавить новость'}
                    titlePlaceholder="Заголовок новости"
                />
            )}
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