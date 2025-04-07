import React from 'react';
import './AppHeroBlockStyle.css'

const AppHeroBlock = () => {
    return (
        <div>
            <div className="hero">
                <div className="container">
                    <div className="hero__content">
                        <div className="hero__text-box">
                            <p>Техническое обслуживание и эксплуатация газораспределительных систем</p>
                        </div>
                        <button className="hero-button"><strong>Подключить газ</strong></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppHeroBlock;