import React from 'react';
import './AppContactInfoStyle.css'
import ContactPhone from '../../assets/svg/contact__phone.svg'
import ContactEmail from '../../assets/svg/contact__mail.svg'
import ContactTarget from "../../assets/svg/contact__target.svg";

const AppContactInfo = () => {
    return (
        <div>
            <div className="contact-info" id="contactAncor">
                <div className="container-contacts">
                    <div className="contact-info__content">
                        <div className="contact__items">
                            <div className="contact__item-icon"><img src={ContactPhone} alt="phone"/>
                            </div>
                            <div className="contact__item-text">Телефон</div>
                            <div className="contact__item-valuer">+7(986) 907-18-00</div>
                        </div>
                        <div className="contact__items" id="contacts">
                            <div className="contact__item-icon"><img src={ContactEmail} alt="mail"/>
                            </div>
                            <div className="contact__item-text">Почта</div>
                            <div className="contact__item-valuer">ir-kazan@mail.ru</div>
                        </div>
                        <div className="contact__items">
                            <div className="contact__item-icon"><img src={ContactTarget} alt=""/>
                            </div>
                            <div className="contact__item-text">Адрес</div>
                            <div className="contact__item-valuer">г.Казань, тер. Химград, д.41, офис 4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppContactInfo;