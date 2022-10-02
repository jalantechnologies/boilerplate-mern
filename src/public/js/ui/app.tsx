import React, { useEffect } from 'react';

import { Header, Footer, LoginForm } from './components';
import InspectLet from '../vendor/inspectlet';

export default function App() {
  useEffect(() => {
    if (CONFIG.inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='container flex-shrink-0'>
        <h1 className='mt-5'>Home</h1>
        <div>Current env - {CONFIG.env}</div>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
