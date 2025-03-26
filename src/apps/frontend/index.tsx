import React from 'react';
import ReactDOM from 'react-dom/client';

import './satoshi.css';
import './style.css';
import App from './app.component';

const container = document.getElementById('app') as HTMLElement;

ReactDOM.createRoot(container).render(<App />);
