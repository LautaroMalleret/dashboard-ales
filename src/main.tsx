import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // <= IMPORTANTE

// main del proyecto
// renderiza el componente App dentro del elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
