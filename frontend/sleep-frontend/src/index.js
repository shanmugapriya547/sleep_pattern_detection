import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App'; // or './components/App' if it's in the components folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
