import React from 'react';
import './style.css';

const ContentBtn = ({name}) => {
    return (
        <div className="article-controls">
            <button className="btn-add-article">{name}</button>
            <div className="article-filter"></div>
        </div>
    );
};

export default ContentBtn;