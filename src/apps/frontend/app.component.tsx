import { TourProvider } from '@reactour/tour';
import { PLACEMENT, ToasterContainer } from 'baseui/toast';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { TourContent } from './components';
import { tourProviderStyles } from './components/tour-content/tour-provider-styles';
import constant from './constants';
import { AuthProvider, BaseWebProvider } from './contexts';
import { Config } from './helpers';
import { AppRoutes } from './routes';
import InspectLet from './vendor/inspectlet';
import './app.global.css';

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
        <TourProvider
          steps={[]}
          ContentComponent={TourContent}
          styles={tourProviderStyles}
        >
          <Router>
            <AppRoutes />
          </Router>
        </TourProvider>
      </BaseWebProvider>
    </AuthProvider>
  );
}
