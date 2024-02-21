import { Block } from 'baseui/block';
import React from 'react';

interface ContentCloseButtonProps {
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const ContentCloseButton: React.FC<ContentCloseButtonProps> = ({
  setIsOpen,
}) => (
  <Block
    display={'flex'}
    justifyContent={'flex-end'}
    onClick={() => {
      setIsOpen(false);
    }}
    overrides={{
      Block: {
        style: {
          cursor: 'pointer',
        },
      },
    }}
  >
    <img src="/assets/svgs/cross-icon.svg" alt="cross-icon" />
  </Block>
);

export default ContentCloseButton;
