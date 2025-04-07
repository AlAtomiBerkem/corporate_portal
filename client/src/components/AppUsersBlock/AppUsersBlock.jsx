import React from 'react';
import './AppUsersBlockStyle.css'
import Fizick from "../../assets/svg/fizick.svg";
import Ip from '../../assets/svg/ip.svg';
import Ooo from '../../assets/svg/ooo.svg';
import Snt from '../../assets/svg/snt.svg';

const AppUsersBlock = () => {
    return (
        <div>
            <div className="users">
                <div className="container-user-block">
                    <div className="users__block">
                        <div className="users__items">
                            <div className="users__items-text"><strong>Физические лица</strong></div>
                            <div className="users__items-icon">
                                <img src={Fizick} alt="fizick"/>
                            </div>
                            <div className="users__items-button">
                                <button><strong>Подробнее</strong></button>
                            </div>
                        </div>
                        <div className="users__items">
                            <div className="users__items-text"><strong>Юридические лица</strong></div>
                            <div className="users__items-icon">
                                <img src={Ooo} alt="ooo"/>
                            </div>
                            <div className="users__items-button">
                                <button><strong>Подробнее</strong></button>
                            </div>
                        </div>
                        {/*<div className="users__items">*/}
                        {/*    <div className="users__items-text"><strong>Индивидуальные предприниматели</strong></div>*/}
                        {/*    <div className="users__items-icon">*/}
                        {/*        <img src={Ip} alt="ip"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="users__items-button">*/}
                        {/*        <button><strong>Подробнее</strong></button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="users__items">
                            <div className="users__items-text"><strong>Садоводческие товарищества</strong></div>
                            <div className="users__items-icon">
                                <img src={Snt} alt="snt"/>
                            </div>
                            <div className="users__items-button">
                                <button><strong>Подробнее</strong></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppUsersBlock;