import clsx from 'clsx';
import React from 'react';

import styles from './header.styles';

type HamburgerToggleButtonProps = {
  isActive: boolean;
  onClick: (state: boolean) => void;
};

const HamburgerToggleButton: React.FC<HamburgerToggleButtonProps> = ({
  isActive,
  onClick,
}) => (
  <button
    aria-controls="sidebar"
    onClick={(e) => {
      e.stopPropagation();
      onClick(!isActive);
    }}
    className={styles.header.hamburgerButton.wrapper}
  >
    <span className={styles.header.hamburgerButton.iconContainer}>
      <span className={styles.header.hamburgerButton.threeLineWrapper}>
        <span
          className={clsx(
            styles.header.hamburgerButton.lineCommon,
            !isActive && '!w-full delay-200'
          )}
        />
        <span
          className={clsx(
            styles.header.hamburgerButton.lineCommon,
            'delay-150',
            !isActive && '!w-full delay-300'
          )}
        />
        <span
          className={clsx(
            styles.header.hamburgerButton.lineCommon,
            'delay-200',
            !isActive && '!w-full delay-500'
          )}
        />
      </span>
      <span className={styles.header.hamburgerButton.crossLineWrapper}>
        <span
          className={clsx(
            styles.header.hamburgerButton.crossLineVertical,
            'delay-300',
            !isActive && '!h-0 !delay-[0]'
          )}
        />
        <span
          className={clsx(
            styles.header.hamburgerButton.crossLineHorizontal,
            'delay-300',
            !isActive && '!h-0 !delay-200'
          )}
        />
      </span>
    </span>
  </button>
);

export default HamburgerToggleButton;
