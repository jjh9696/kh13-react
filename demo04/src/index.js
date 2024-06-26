import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//기본적으로 제공되는 것 외에 추가할 라이브러리를 불러온다
//확장자가 없으면 .js
import "bootstrap/dist/css/bootstrap.min.css"
import "bootswatch/dist/sandstone/bootstrap.min.css"
import './index.css';

import "bootstrap";//js는 경로를 생략해도 기본경로로 선택됨 //index.js가 생략됨

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
