import React from "react";
import "./../css/header.css";
import Logo from './../img/setting.svg';

const Header = ({ onPageChange }) => {
    const handleClick = (page) => {
        if (typeof onPageChange === 'function') {
            onPageChange(page);
        }
    };

    return (
        <div className="header">
            <div className="header-sections">
                <div className="section-button" onClick={() => handleClick("Главная")}>
                    Главная
                </div>
                <div className="section-button" onClick={() => handleClick("Карта")}>
                    Карта
                </div>
                <div className="section-button" onClick={() => handleClick("Оповещения")}>
                    Оповещения
                </div>
            </div>
            <div className="settings">
                <img src={Logo} alt="Настройки" />
            </div>
        </div>
    );
};

export default Header
