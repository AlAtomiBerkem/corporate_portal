import UseContentSection from '../../../hooks/useContentSection.jsx';
import ContentEditor from '../createContentComp/ContentEditor.jsx'; // <- обратите внимание на переименование файла
import { publicApi } from "../../../api/publicApi.js";
import { adminApi } from "../../../api/adminApi.js";
import '../styles/NewsSection.css';
import { renderContent } from '../../../helpers/renderContent.js';

const NewsSection = () => {
    const renderContentCard = (contentItem) => (
        <>
            <h3 className="news-title">{contentItem.title}</h3>
            <div 
                className="news-content"
                dangerouslySetInnerHTML={{ __html: renderContent(contentItem.content, 200) }}
            />
        </>
    );

    return (
        <UseContentSection
            apiMethods={{
                get: publicApi.getContent,
                create: adminApi.createContent,
                update: adminApi.updateContent,
                delete: adminApi.deleteContent
            }}
            formComponent={(props) => (
                <ContentEditor
                    {...props}
                    apiMethods={{
                        create: adminApi.createContent,
                        update: adminApi.updateContent
                    }}
                    contentType="статьи"
                    formTitle={props.initialData ? 'Редактировать статью' : 'Добавить статью'}
                    titlePlaceholder="Заголовок статьи"
                />
            )}
            cardContentRender={renderContentCard}
            addButtonText="+ Добавить статью"
            pageTitle="статьи"
            emptyStateText="статей пока нет"
            sectionClassName="news-section"
            listClassName="news-list"
            footerClassName="news-footer"
            dateClassName="news-date"
            actionsClassName="news-actions"
        />
    );
};

export default NewsSection;