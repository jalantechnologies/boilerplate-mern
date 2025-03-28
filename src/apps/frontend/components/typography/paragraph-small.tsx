import React, { PropsWithChildren } from 'react';

import styles from './typography.styles';

const ParagraphSmall: React.FC<PropsWithChildren> = ({ children }) => (
  <p className={styles.typography.paragraphSmall}>{children}</p>
);

export default ParagraphSmall;
