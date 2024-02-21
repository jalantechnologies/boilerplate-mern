import { Block } from 'baseui/block';
import { SIZE } from 'baseui/button';
import React from 'react';

import { Button } from '..';

interface ContentEndButtonProps {
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const ContentEndButton: React.FC<ContentEndButtonProps> = ({
  setIsOpen,
}: ContentEndButtonProps) => (
  <Button
    onClick={() => {
      setIsOpen(false);
    }}
    size={SIZE.compact}
  >
    <Block font={'ParagraphSmall'}>End Tour</Block>
  </Button>
);

export default ContentEndButton;
