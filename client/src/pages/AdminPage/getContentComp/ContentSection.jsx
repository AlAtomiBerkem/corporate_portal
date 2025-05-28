import { useState, useEffect } from 'react';
import { useFetchData } from "../../../hooks/useFetchData.js";
import { useDeleteData } from "../../../hooks/useDeleteData.js";
import { publicApi } from "../../../api/publicApi.js";
import NewsForm from '../createContentComp/NewsForm.jsx';
import ContentBtn from "../../../components/AdmiinNewContentBtn/ContentBtn.jsx";
import Card from '../Shared/Card.jsx';
import ScrollPageToTop from "../../../helpers/ScrollPageToTop.js";
import '../styles/ArticleSection.css';

const ArticleSection = () => {

    


    const { data: content, loading } = useFetchData(publicApi.getContent);
    if(loading) return <div>...загрузака статей</div>

    return (
        <div className="article-section">
            <ContentBtn name={'+ Добавить контент'}/>
            <div className="article-list">
                {content.map((item, index) => (
                    <Card key={item.id || index}>
                        <div className="article-item">
                            <div className="article-header">
                                <h3>{item.title}</h3>
                            </div>
                            <p className="article-excerpt">{item.content}</p>
                            <div className="article-footer">
                                <div className="article-meta">
                                    <span className="article-date">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="article-actions">
                                    <button className="btn-edit">Редактировать</button>
                                    <button className="btn-delete">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ArticleSection;