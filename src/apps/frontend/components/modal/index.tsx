import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './modal.styles';

interface ModalProps {
  isModalOpen: boolean;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  isModalOpen,
}) => (
  <div
    className={clsx(
      styles.modal.overlay,
      isModalOpen ? styles.modal.overlayVisible : styles.modal.overlayHidden
    )}
  >
    <div className={styles.modal.container}>{children}</div>
  </div>
);

export default Modal;
