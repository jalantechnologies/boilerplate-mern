import React, { PropsWithChildren } from 'react';

import styles from './typography.styles';

const LabelLarge: React.FC<PropsWithChildren> = ({ children }) => (
  <label className={styles.typography.labelLarge}>{children}</label>
);

export default LabelLarge;
