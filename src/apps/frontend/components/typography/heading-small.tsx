import React, { PropsWithChildren } from 'react';

import styles from './typography.styles';

const HeadingSmall: React.FC<PropsWithChildren> = ({ children }) => (
  <h3 className={styles.typography.headingSmall}>{children}</h3>
);

export default HeadingSmall;
