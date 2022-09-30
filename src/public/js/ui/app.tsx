import React, { useEffect } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { LoginForm } from './components/login-form';
import InspectLet from '../vendor/inspectlet';

export const App: React.FC = () => {
  useEffect(() => {
    if (window.inspectletKey) {
      InspectLet();
    }
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className='container flex-shrink-0'>
          <h1 className='mt-5'>Home</h1>
          <div>Current env - {CONFIG.app.env}</div>
          {/* DUMMY LOGIN FORM FOR CYPRESS - REMOVE AT WILL */}
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
};
