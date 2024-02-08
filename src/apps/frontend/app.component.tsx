import { PLACEMENT, ToasterContainer } from 'baseui/toast';
import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './app.global.css';

import constant from './constants';
import { AuthProvider, BaseWebProvider } from './contexts';
import { Config } from './helpers';
import { About, NotFound } from './pages';
import MainLayout from './pages/app-layout/main-layout';
import InspectLet from './vendor/inspectlet';

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <AuthProvider>
      <BaseWebProvider>
        <ToasterContainer
          placement={PLACEMENT.topRight}
          autoHideDuration={constant.TOASTER_AUTO_HIDE_DURATION}
        />
        <Router>
          <Routes>
            <Route path="/about" element={<About />} />
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<MainLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </BaseWebProvider>
    </AuthProvider>
  );
}
