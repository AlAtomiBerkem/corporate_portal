import React from 'react';
import './AppFooterStyle.css'
import Logo from '../../assets/logo10.png'

const AppFooter = () => {
    return (
        <div>
            <div className="footer">
                <div className="container">
                    <div className="footer_content">
                        <div className="footer_content-logo"><img src={Logo} alt="logo"/></div>
                        <div className="footer_content-company_name">Инженерные решения</div>
                        <div className="footer_content-contacts">
                            <ul>
                                <li><strong>адрес:</strong> 420006, Татарстан, г.Казань, тер. Химград, д.41, офис 4</li>
                                <li><strong>почта:</strong> ir-kazan@mail.ru</li>
                                <li><strong>телефон:</strong> +7(986) 907-18-00</li>
                                <li><strong>режим работы:</strong> 9:00 - 21:00 с пн по сб</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppFooter;