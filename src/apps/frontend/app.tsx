import React, { useEffect } from 'react';

import { Header, Footer, LoginForm } from './components';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

export default function App() {
  useEffect(() => {
    if (window.Config.inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='container flex-shrink-0'>
        <h1 className='mt-5'>Home</h1>
        <div>Current env - {window.Config.env}</div>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
