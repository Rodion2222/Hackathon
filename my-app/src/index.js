import React from 'react';
import ReactDOM from 'react-dom/client';
import './../src/css/index.css';
import Header from './components/header';
import Main from './components/mainPart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>
);
