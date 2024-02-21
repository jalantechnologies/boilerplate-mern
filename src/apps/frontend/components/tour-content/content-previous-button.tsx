import { Block } from 'baseui/block';
import { SIZE } from 'baseui/button';
import React from 'react';

import { Button } from '..';

interface ContentPreviousButtonProps {
  setCurrentStep: (value: React.SetStateAction<number>) => void;
}

const ContentPreviousButton: React.FC<ContentPreviousButtonProps> = ({
  setCurrentStep,
}: ContentPreviousButtonProps) => (
  <Button
    onClick={() => {
      setCurrentStep((s) => s - 1);
    }}
    size={SIZE.compact}
  >
    <Block font={'ParagraphSmall'}>Prev</Block>
  </Button>
);

export default ContentPreviousButton;
