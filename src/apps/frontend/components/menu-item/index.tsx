import clsx from 'clsx';
import React, { PropsWithChildren, useState } from 'react';

import { ButtonKind } from '../../types/button';
import Button from '../button';

import styles from './menu-item.styles';

const MenuItem: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.menuItemWrapper}>
      <Button onClick={() => setIsOpen(!isOpen)} kind={ButtonKind.TERTIARY}>
        <img src="assets/svg/ellipsis-icon.svg" alt="Ellipsis Icon" />
      </Button>
      <div
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={clsx(
          styles.menuItemDropdown,
          isOpen
            ? styles.menuItemDropdownVisible
            : styles.menuItemDropdownHidden
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MenuItem;
