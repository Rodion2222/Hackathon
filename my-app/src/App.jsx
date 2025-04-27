import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapPage from './../src/components/mapPage';
import Main from './components/mainPart';
import AlertPage from './../src/components/alertPage';
import Logo from './../src/img/setting.svg';
import "./../src/css/header.css";

function App() {
  return (
    <Router className = "header">
      <nav className='header-sections'>
        <Link className='section-button' to="/">Главная</Link>
        <Link className='section-button' to="/map">Карта</Link>
        <Link className='section-button' to="/alerts">Оповещения</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/alerts" element={<AlertPage />} />
      </Routes>
      <div className="settings">
        <img src={Logo} alt="Настройки" />
      </div>
    </Router>
  );
}

export default App;
