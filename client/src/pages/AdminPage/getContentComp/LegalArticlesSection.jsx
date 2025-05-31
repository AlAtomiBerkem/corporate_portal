import UseContentSection from '../../../hooks/useContentSection.jsx';
import ContentEditor from '../createContentComp/ContentEditor.jsx';
import { publicApi } from "../../../api/publicApi.js";
import { adminApi } from "../../../api/adminApi.js";
import '../styles/LegalArticlesSection.css';

const LegalArticlesSection = () => {
    const renderLegalCard = (legalItem) => (
        <>
            <h3 className='news-title'>{legalItem.title}</h3>
            <div
                className='news-content'
                dangerouslySetInnerHTML={{ __html: legalItem.content }}
            />
        </>
    )

    return (
        <UseContentSection
            apiMethods={{
                get: publicApi.getLegalArticle,
                create: adminApi.createLegal,
                update: adminApi.updateLegal,
                delete: adminApi.deleteLegal
            }}
            formComponent={(props) => (
                <ContentEditor
                    {...props}
                    apiMethods={{
                        create: adminApi.createLegal,
                        update: adminApi.updateLegal
                    }}
                    contentType="Юр статья"
                    formTitle={props.initialData ? 'Редактировать статью' : 'Добавить статью'}
                    titlePlaceholder="Заголовок статьи"
                />
            )}
            cardContentRender={renderLegalCard}
            addButtonText="+ Добавить статью"
            pageTitle="Статьи"
            emptyStateText="Статей пока нет"
            sectionClassName="news-section"
            listClassName="news-list"
            footerClassName="news-footer"
            dateClassName="news-date"
            actionsClassName="news-actions"
        />
    );
};

export default LegalArticlesSection;