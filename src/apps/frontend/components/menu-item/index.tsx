import clsx from 'clsx';
import React, { PropsWithChildren, useState } from 'react';

import { ButtonKind } from '../../types/button';
import Button from '../button';

import styles from './menu-item.styles';

const MenuItem: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.menuItem.wrapper}>
      <Button onClick={() => setIsOpen(!isOpen)} kind={ButtonKind.TERTIARY}>
        <img src="assets/svg/ellipsis-icon.svg" alt="Ellipsis Icon" />
      </Button>
      <div
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={clsx(
          styles.menuItem.dropdown,
          isOpen
            ? styles.menuItem.dropdownVisible
            : styles.menuItem.dropdownHidden
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MenuItem;
