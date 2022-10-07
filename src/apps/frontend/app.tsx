import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { Header, Footer } from './components';
import { DepsProvider } from './contexts';
import { About, Login } from './pages';
import { AccessService } from './services';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

export default function App() {
  useEffect(() => {
    if (window.Config.inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <DepsProvider deps={{
      accessService: new AccessService(),
    }}>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </DepsProvider>
  );
}
