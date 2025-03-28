import 'frontend/satoshi.css';
import 'frontend/style.css';
import App from 'frontend/app.component';
import React from 'react';
import ReactDOM from 'react-dom/client';

const container = document.getElementById('app');

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
ReactDOM.createRoot(container).render(<App />);
