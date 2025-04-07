import React from 'react';
import './AppNaturalGasBlockStyle.css'
import ConactionGas from '../../assets/img/conaction_gas.jpg'
import DisconnectedGas from '../../assets/img/disconection_gas.png'

const AppNaturalGasBlock = () => {
    return (
        <div>
            <div className="blog2">
                <div className="gas-block-container">
                    <div className="blog2-content">
                        <div className="connected_gas">
                            <div className="connected_gas-text">
                                <h4>Уже подключены к газу?</h4>
                                <p>Закажите услуги газораспределительной организации онлайн: техническое обслуживание,
                                    установка и замена газового оборудования, разработка проекта и пр.</p>
                            </div>
                            <div className="connected_gas-img"><img src={ConactionGas} alt="connected_gas"/></div>
                        </div>
                        <div className="disconnected_gas">
                            <div className="disconnected_gas-text">
                                <h4>Еще не подключены?</h4>
                                <p>Получите всю необходимую информацию о вариантах газификации</p>
                            </div>
                            <div className="disconnected_gas-img"><img src={DisconnectedGas}
                                                                       alt="disconected_gas"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppNaturalGasBlock;