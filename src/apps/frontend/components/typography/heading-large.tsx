import React, { PropsWithChildren } from 'react';

import styles from './typography.styles';

const HeadingLarge: React.FC<PropsWithChildren> = ({ children }) => (
  <h2 className={styles.typography.headingLarge}>{children}</h2>
);

export default HeadingLarge;
