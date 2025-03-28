import React from 'react';

import Spinner from '../spinner/spinner';

import styles from './spinner.styles';

const FullScreenSpinner: React.FC = () => (
  <div className={styles.spinner.fullScreen.wrapper}>
    <Spinner />
  </div>
);

export default FullScreenSpinner;
