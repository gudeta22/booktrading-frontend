import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GoogleAuthProvider from './Components/login/GoogleAuthProvide';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
     <GoogleAuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
