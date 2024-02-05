import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Demo from './Demo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const alphaTab = ReactDOM.createRoot(document.getElementById('alphaTab'));
alphaTab.render(
    <Demo />
);