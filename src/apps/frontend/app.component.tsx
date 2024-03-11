import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

import { AccountProvider, AuthProvider, ResetPasswordProvider } from './contexts';
import { Config } from './helpers';
import { AppRoutes } from './routes';
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
      <ResetPasswordProvider>
        <AccountProvider>
          <Toaster />
          <Router>
            <AppRoutes />
          </Router>
        </AccountProvider>
      </ResetPasswordProvider>
    </AuthProvider>
  );
}
