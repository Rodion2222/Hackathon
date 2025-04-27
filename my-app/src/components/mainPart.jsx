import React from "react";
import Telegram from './../img/Tg.svg'
import "./../css/mainPart.css"
import GroupOrange from "./../img/Orange.png"
import GroupC from "./../img/Blue.png"


const Main = () => {
    return (
        <>
            <img className="BlueC" alt="" src={GroupC}/>
            <img className="Orange" alt="" src={GroupOrange}/>
            <div className="footer">
                <h1 className="footer-title">
                    Мы — новая эра мониторинга общественного транспорта.
                </h1>
                <div className="footer-about">
                    <h2 className="h2">
                        О нас
                    </h2>
                    <p>
                        Мы энтузиасты, которые стремятся улучшить мониторинг общественного транспорта до небывалого до ныне уровня.
                    </p>
                </div>
                <div className="footer-copyright">
                    <b>UNICODE</b>
                    <span>2025</span>
                    <img className="imgTg" src= {Telegram} alt="Telegram" />
                </div>
            </div>
        </>
    );
};

export default Main

