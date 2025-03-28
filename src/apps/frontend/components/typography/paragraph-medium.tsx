import React, { PropsWithChildren } from 'react';

import styles from './typography.styles';

const ParagraphMedium: React.FC<PropsWithChildren> = ({ children }) => (
  <p className={styles.typography.paragraphMedium}>{children}</p>
);

export default ParagraphMedium;
