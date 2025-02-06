import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

import { AccountProvider, AuthProvider } from './contexts';
import { Config } from './helpers';
import { AppRoutes } from './routes';
import InspectLet from './vendor/inspectlet';

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectLetKey = Config.getConfigValue('inspectLetKey');

    if (inspectLetKey) {
      InspectLet();
    }
  }, []);

  return (
    <AuthProvider>
      <AccountProvider>
        <Toaster />
        <Router>
          <AppRoutes />
        </Router>
      </AccountProvider>
    </AuthProvider>
  );
}
