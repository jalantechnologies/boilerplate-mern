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
      styles.modalOverlay,
      isModalOpen ? styles.modalOverlayVisible : styles.modalOverlayHidden
    )}
  >
    <div className={styles.modalContainer}>{children}</div>
  </div>
);

export default Modal;
