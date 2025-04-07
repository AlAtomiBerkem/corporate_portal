import React, { useState } from 'react';
import './AppFAQstyle.css';

const FAQ = () => {
    const [activeId, setActiveId] = useState(null);

    const faqData = [
        {
            id: 1,
            question: "Как заключить, перезаключить договора на ТО ВДГО/ВКГО?",
            answer: (
                <>
                    <p>Согласно Постановлению Правительства РФ 859 от 29.05.2023 с 1 сентября 2023 года:</p>

                    <ul className="faq-indented-list">
                        <li>Исполнителем по договорам о техническом обслуживании внутридомового и внутриквартирного газового оборудования может являться исключительно газораспределительная организация.</li>
                        <li>Договоры, заключенные собственниками жилых домов/квартир до 01 сентября 2023 года с иными специализированными организациями, действуют до их прекращения или расторжения.</li>
                    </ul>

                    <p>Для заключения или перезаключения договора на ТО ВДГО/ВКГО:</p>

                    <ol className="faq-indented-list">
                        <li>Обратиться в ближайшую газораспределительную организацию, осуществляющую деятельность на территории Вашего субъекта РФ.</li>
                        <li>
                            Информацию о газораспределительных организациях можно найти:
                            <ul className="faq-nested-list">
                                <li>В разделе «Контакты» → вкладка «Регионы»</li>
                                <li>На портале единого оператора газификации: <span className="faq-highlight">коннект газ точка ру</span></li>
                            </ul>
                        </li>
                    </ol>
                </>
            )
        },
        {
            id: 2,
            question: "Как подать заявку на подключение газа?",
            answer: (
                <>
                    <p>Вы можете подать заявку любым удобным для Вас способом:</p>

                    <div className="faq-method">
                        <h4 className="faq-method-title">Дистанционно:</h4>
                        <ul className="faq-method-list">
                            <li>Через портал Единого оператора газификации (<a href="https://connectgas.ru" target="_blank" rel="noopener noreferrer">connectgas.ru</a>)</li>
                            <li>Через портал «Госуслуги»</li>
                            <li>Оставив заявку на сайте газораспределительной организации</li>
                        </ul>
                    </div>

                    <div className="faq-method">
                        <h4 className="faq-method-title">Лично:</h4>
                        <ul className="faq-method-list">
                            <li>В клиентском центре газораспределительной организации</li>
                            <li>В МФЦ (многофункциональном центре)</li>
                        </ul>
                    </div>

                    <div className="faq-method">
                        <h4 className="faq-method-title">Почтой:</h4>
                        <p>Отправить заявку с комплектом документов в адрес газораспределительной организации по почте.</p>
                    </div>
                </>
            )
        },
        {
            id: 3,
            question: "Что мне нужно сделать, чтобы получить газ?",
            answer: (
                <ol className="faq-answer-list">
                    <li>Подать заявку на подключение к газу любым удобным для Вас способом.</li>
                    <li>Заключить договор на подключение с газораспределительной организацией.</li>
                    <li>Построить сети газопотребления внутри участка и внутридомовые сети.</li>
                    <li>Заключить договор на техническое обслуживание (ТО ВДГО).</li>
                    <li>Заключить договор на поставку газа с поставщиком газа.</li>
                </ol>
            )
        },
        {
            id: 4,
            question: "Что такое \"Расчет максимального часового расхода газа\"? Кто его изготавливает?",
            answer: (
                <>
                    <p>
                        <strong>Расчет максимального часового расхода газа</strong> — это документ, который:
                    </p>

                    <ul className="faq-feature-list">
                        <li>Определяет проектируемые нагрузки на системы:</li>
                        <ul className="faq-sublist">
                            <li>Теплоснабжение</li>
                            <li>Горячее водоснабжение</li>
                            <li>Вентиляцию</li>
                            <li>Технологические нужды</li>
                        </ul>
                        <li>Служит основанием для подбора газоиспользующего оборудования</li>
                    </ul>

                    <div className="faq-who">
                        <h4>Кто может выполнить расчет:</h4>
                        <ul className="faq-who-list">
                            <li>Любая организация, имеющая в штате специалистов-теплотехников</li>
                            <li>Газораспределительные организации (в рамках своих услуг)</li>
                        </ul>
                    </div>
                </>
            )
        },
        {
            id: 5,
            question: "Сколько стоит подключение газа?",
            answer: (
                <>
                    <div className="faq-price-section">
                        <h4 className="faq-price-title">Бесплатное подключение по программе догазификации:</h4>
                        <p>Подведение газа до границ земельного участка осуществляется без взимания средств с граждан.</p>
                    </div>

                    <div className="faq-price-section">
                        <h4 className="faq-price-title">Платное подключение (вне программы):</h4>
                        <ul className="faq-price-list">
                            <li>Стоимость определяется газораспределительной организацией</li>
                            <li>Зависит от технических параметров подключения</li>
                            <li>Рассчитывается по утвержденной методике</li>
                        </ul>
                    </div>

                    <div className="faq-price-section">
                        <h4 className="faq-price-title">Стоимость внутри участка:</h4>
                        <p>Зависит от:</p>
                        <ul className="faq-factor-list">
                            <li>Объема работ по строительству газопровода</li>
                            <li>Способа прокладки газопровода</li>
                            <li>Выбранного исполнителя работ</li>
                        </ul>
                    </div>

                    <div className="faq-price-options">
                        <div className="faq-option">
                            <h5>Газораспределительная организация:</h5>
                            <p>Стоимость услуг регулируется государством</p>
                        </div>
                        <div className="faq-option">
                            <h5>Сторонняя организация:</h5>
                            <p>Рыночная стоимость услуг</p>
                        </div>
                    </div>

                    <div className="faq-calculate">
                        <h4>Как узнать стоимость:</h4>
                        <ol className="faq-calculate-list">
                            <li>
                                Предварительный расчет:
                                <ul className="faq-calculate-sublist">
                                    <li>На портале <a href="https://connectgas.ru" target="_blank" rel="noopener noreferrer">connectgas.ru</a> в разделе «Калькулятор»</li>
                                    <li>Обратившись в газораспределительную организацию</li>
                                </ul>
                            </li>
                            <li>
                                Точная стоимость:
                                <p>Определяется при обращении в газораспределительную организацию</p>
                            </li>
                        </ol>
                    </div>
                </>
            )
        },
        {
            id: 6,
            question: "Почему я должен заключать договор на техническое обслуживание газового оборудования?",
            answer: (
                <>
                    <div className="faq-legal-requirement">
                        <h4 className="faq-section-title">Законное требование:</h4>
                        <p>
                            Наличие договора на ТО ВДГО/ВКГО является <strong>обязательным условием</strong> для поставки газа.
                        </p>
                        <div className="faq-legal-reference">
                            <span className="faq-legal-icon">📜</span>
                            Основание: Постановление Правительства РФ № 410 "О мерах по обеспечению безопасности при использовании и содержании внутридомового и внутриквартирного газового оборудования"
                        </div>
                    </div>

                    <div className="faq-responsibility">
                        <h4 className="faq-section-title">Кто обязан заключать договор:</h4>
                        <ul className="faq-responsibility-list">
                            <li>Собственники жилья</li>
                            <li>Наниматели жилых помещений</li>
                        </ul>
                    </div>

                    <div className="faq-equipment">
                        <h4 className="faq-section-title">Какое оборудование подлежит обслуживанию:</h4>
                        <div className="faq-equipment-grid">
                            <div className="faq-equipment-item">Газовая плита</div>
                            <div className="faq-equipment-item">Газовый водонагреватель</div>
                            <div className="faq-equipment-item">Газовый котел</div>
                            <div className="faq-equipment-item">Внутридомовой газопровод</div>
                        </div>
                    </div>

                    <div className="faq-purpose">
                        <h4 className="faq-section-title">Основная цель обслуживания:</h4>
                        <div  >
                            {/*<span className="faq-badge-icon">⚠️</span>*/}
                            Обеспечение безопасности и предотвращение аварийных ситуаций
                        </div>
                    </div>
                </>
            )
        }

    ];

    const toggleItem = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="faq-block">
        <div className="faq-container">
            <h2>Часто задаваемые вопросы</h2>
            {faqData.map((item) => (
                <div key={item.id} className="faq-item">
                    <div
                        className="faq-question"
                        onClick={() => toggleItem(item.id)}
                    >
                        {item.question}
                        <span className={`faq-icon ${activeId === item.id ? 'open' : ''}`}>
            </span>
                    </div>
                    <div className={`faq-answer ${activeId === item.id ? 'open' : ''}`}>
                        <div>{item.answer}</div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default FAQ;