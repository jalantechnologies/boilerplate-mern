import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { Header, Footer } from './components';
import { AuthContextProvider } from './contexts/auth-context.provider';
import { About, Login, Signup, NotFound } from './pages';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

export default function App(): React.ReactElement {
  useEffect(() => {
    if (window.Config.inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <AuthContextProvider>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthContextProvider>
  );
}
