import React, { useEffect } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { LoginForm } from './components/login-form';
import InspectLet from '../vendor/inspectlet';
import Hello from './base-web';

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
          <LoginForm />
        </div>
      </main>
      <Footer />
      <Hello />
    </>
  );
};
