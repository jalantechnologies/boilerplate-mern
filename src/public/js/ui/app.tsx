import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { LoginForm } from './components/login-form';
import InspectLet from '../../../utils/Inspect';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Helmet>
        <script src="./Inspect.js" type="text/javascript">
          {InspectLet()}
        </script>
      </Helmet>
      <main>
        <div class="container flex-shrink-0">
          <h1 class="mt-5">Hom</h1>
          {/* DUMMY LOGIN FORM FOR CYPRESS - REMOVE AT WILL */}
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
};