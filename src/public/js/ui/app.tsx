import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { LoginForm } from './components/login-form';
import InspectLet from '../vendor/inspectlet';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Helmet>
        <script type="text/javascript">
          {InspectLet()}
        </script>
      </Helmet>
      <main>
        <div class="container flex-shrink-0">
          <h1 class="mt-5">Home</h1>
          {/* DUMMY LOGIN FORM FOR CYPRESS - REMOVE AT WILL */}
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
};
