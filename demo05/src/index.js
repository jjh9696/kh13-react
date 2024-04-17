import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootswatch/dist/sandstone/bootstrap.min.css"
import './index.css';

import "bootstrap";//js는 경로를 생략해도 기본경로로 선택됨 //index.js가 생략됨
import { BrowserRouter, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 리엑트 라우터를 사용하는 역역을 지정 */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
