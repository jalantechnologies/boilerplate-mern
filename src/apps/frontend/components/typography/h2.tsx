import React, { PropsWithChildren } from 'react';

import styles from './typography.styles';

const H2: React.FC<PropsWithChildren> = ({ children }) => (
  <h2 className={styles.typography.h2}>{children}</h2>
);

export default H2;
