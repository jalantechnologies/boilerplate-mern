import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
}) => (
    <button
      onClick={onClick}
      className="mb-5 cursor-pointer text-lg transition active:text-primary/80"
    >
      Back
    </button>
);

export default BackButton;
