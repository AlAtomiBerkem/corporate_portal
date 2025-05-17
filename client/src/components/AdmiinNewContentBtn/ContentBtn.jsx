import React from 'react';
import './style.css';

const ContentBtn = ({ name, onClick }) => {
    return (
        <div className="article-controls">
            <button className="btn-add-article" onClick={onClick}>
                {name}
            </button>
            <div className="article-filter"></div>
        </div>
    );
};

export default ContentBtn;