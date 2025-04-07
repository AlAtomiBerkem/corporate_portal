import React from 'react';
import './AppMaintenanceStyle.css';
import Img2 from '../../assets/img/img2.jpg'

const AppMaintenance = () => {
    return (
        <div>
            <div className="maintenance">
                <div className="container">
                    <div className="maintenance__content" id="maintenanceAncor">
                        <div className="maintenance__content-topic">
                            <h2>Техническое обслуживание газового оборудования: ключевые аспекты</h2>
                        </div>
                        <div className="maintenance__content-wrapper">
                            <div className="maintenance__content-text"
                                 style={{
                                     color: '#ffffff',
                                     fontFamily: 'Arial, sans-serif',
                                     lineHeight: 1.6,
                                     maxWidth: '800px',
                                     margin: '0 auto',
                                     backgroundColor: 'transparent'
                                 }}>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{
                                        color: '#ffffff',
                                        marginBottom: '15px',
                                        fontWeight: 500
                                    }}>
                                        Что такое ВКГО и ВДГО?
                                    </h3>

                                    <div style={{
                                        marginBottom: '15px',
                                        paddingLeft: '15px',
                                        borderLeft: '2px solid #666'
                                    }}>
                                        <p style={{
                                            fontWeight: 500,
                                            marginBottom: '5px'
                                        }}>
                                            Внутриквартирное газовое оборудование (ВКГО):
                                        </p>
                                        <p style={{ margin: 0, opacity: 0.9 }}>
                                            Газовые плиты, отопительные котлы, водонагреватели и коммуникации внутри квартиры/частного дома.
                                        </p>
                                    </div>

                                    <div style={{
                                        paddingLeft: '15px',
                                        borderLeft: '2px solid #666'
                                    }}>
                                        <p style={{
                                            fontWeight: 500,
                                            marginBottom: '5px'
                                        }}>
                                            Внутридомовое газовое оборудование (ВДГО):
                                        </p>
                                        <p style={{ margin: 0, opacity: 0.9 }}>
                                            Газопроводы, регулирующая арматура, системы контроля загазованности, приборы учета газа и другие устройства до первого запорного крана на входе в квартиру.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{
                                        color: '#ffffff',
                                        marginBottom: '15px',
                                        fontWeight: 500
                                    }}>
                                        Кто проводит обслуживание?
                                    </h3>
                                    <p style={{ marginBottom: '10px', opacity: 0.9 }}>
                                        Техническое обслуживание выполняют газораспределительные организации (ГРО), имеющие лицензию и соответствующие требованиям:
                                    </p>
                                    <ul style={{
                                        paddingLeft: '20px',
                                        margin: '10px 0',
                                        listStyleType: 'none'
                                    }}>
                                        <li style={{
                                            marginBottom: '8px',
                                            position: 'relative',
                                            paddingLeft: '15px',
                                            opacity: 0.9
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: 0,
                                                color: '#ccc'
                                            }}>•</span> Квалифицированные специалисты
                                        </li>
                                        <li style={{
                                            marginBottom: '8px',
                                            position: 'relative',
                                            paddingLeft: '15px',
                                            opacity: 0.9
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: 0,
                                                color: '#ccc'
                                            }}>•</span> Круглосуточная аварийная служба
                                        </li>
                                        <li style={{
                                            marginBottom: '8px',
                                            position: 'relative',
                                            paddingLeft: '15px',
                                            opacity: 0.9
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: 0,
                                                color: '#ccc'
                                            }}>•</span> Соблюдение норм безопасности
                                        </li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{
                                        color: '#ffffff',
                                        marginBottom: '15px',
                                        fontWeight: 500
                                    }}>
                                        Как узнать обслуживающую организацию
                                    </h3>
                                    <ul style={{
                                        paddingLeft: '20px',
                                        margin: '10px 0',
                                        listStyleType: 'none'
                                    }}>
                                        <li style={{ marginBottom: '8px', opacity: 0.9 }}>• Через управляющую компанию</li>
                                        <li style={{ marginBottom: '8px', opacity: 0.9 }}>• На сайте поставщика газа</li>
                                        <li style={{ marginBottom: '8px', opacity: 0.9 }}>• По номеру лицевого счета из квитанции</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{
                                        color: '#ffffff',
                                        marginBottom: '15px',
                                        fontWeight: 500
                                    }}>
                                        Обязательность и последствия
                                    </h3>
                                    <p style={{
                                        fontWeight: 500,
                                        marginBottom: '5px'
                                    }}>
                                        Техобслуживание обязательно:
                                    </p>
                                    <p style={{
                                        marginTop: 0,
                                        marginBottom: '15px',
                                        opacity: 0.9
                                    }}>
                                        Согласно Постановлению №410 от 14.05.2013 и изменениям 2023 года, договор с ГРО — условие для поставки газа.
                                    </p>

                                    <p style={{
                                        fontWeight: 500,
                                        marginBottom: '5px'
                                    }}>
                                        Последствия нарушений:
                                    </p>
                                    <ul style={{
                                        paddingLeft: '20px',
                                        margin: '10px 0',
                                        listStyleType: 'none'
                                    }}>
                                        <li style={{ marginBottom: '8px', opacity: 0.9 }}>• Штрафы</li>
                                        <li style={{ marginBottom: '8px', opacity: 0.9 }}>• Приостановка подачи газа</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{
                                        color: '#ffffff',
                                        marginBottom: '15px',
                                        fontWeight: 500
                                    }}>
                                        Как заключить договор?
                                    </h3>
                                    <p style={{
                                        fontWeight: 500,
                                        marginBottom: '5px'
                                    }}>
                                        Документы:
                                    </p>
                                    <p style={{
                                        marginTop: 0,
                                        marginBottom: '15px',
                                        opacity: 0.9
                                    }}>
                                        Паспорт, выписка из ЕГРН на квартиру/дом.
                                    </p>

                                    <p style={{
                                        fontWeight: 500,
                                        marginBottom: '5px'
                                    }}>
                                        Формы договоров:
                                    </p>
                                    <p style={{
                                        marginTop: 0,
                                        marginBottom: '15px',
                                        opacity: 0.9
                                    }}>
                                        Типовые договоры для ВКГО/ВДГО в МКД, частных домов.
                                    </p>

                                    <p style={{
                                        fontWeight: 500,
                                        marginBottom: '5px'
                                    }}>
                                        Сроки:
                                    </p>
                                    <p style={{ marginTop: 0, opacity: 0.9 }}>
                                        Обслуживание проводится ежегодно или по заявке.
                                    </p>
                                </div>
                            </div>
                            <div className="maintenance__content-image">
                                <img src={Img2} alt="Газовое оборудование"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppMaintenance;