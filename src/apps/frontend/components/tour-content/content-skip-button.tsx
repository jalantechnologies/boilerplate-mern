import { Block } from 'baseui/block';
import React from 'react';

interface ContentSkipButtonProps {
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const ContentSkipButton: React.FC<ContentSkipButtonProps> = ({
  setIsOpen,
}: ContentSkipButtonProps) => (
  <Block
    font={'LabelMedium'}
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
    Skip
  </Block>
);

export default ContentSkipButton;
