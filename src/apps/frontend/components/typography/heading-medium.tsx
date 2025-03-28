import React, { PropsWithChildren } from 'react';

import styles from './typography.styles';

const HeadingMedium: React.FC<PropsWithChildren> = ({ children }) => (
  <h3 className={styles.typography.headingMedium}>{children}</h3>
);

export default HeadingMedium;
