import React, { PropsWithChildren } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void; // Optional onClose prop
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  onClose,
}) => (
  <div
    className={`fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80  ${
      isOpen ? 'block' : 'hidden'
    }`}
  >
    <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default sm:p-8 xl:p-10">
      {onClose && (
        <button
          className="absolute top-0 right-0 mt-4 mr-4"
          onClick={onClose}
        >
        </button>
      )}
      {children}
    </div>
  </div>
);

export default Modal;