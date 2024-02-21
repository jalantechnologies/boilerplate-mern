import { Block } from 'baseui/block';
import { SIZE } from 'baseui/button';
import React from 'react';

import { Button } from '..';

interface ContentNextButtonProps {
  setCurrentStep: (value: React.SetStateAction<number>) => void;
}

const ContentNextButton: React.FC<ContentNextButtonProps> = ({
  setCurrentStep,
}: ContentNextButtonProps) => (
  <Button
    onClick={() => {
      setCurrentStep((s) => s + 1);
    }}
    size={SIZE.compact}
  >
    <Block font={'ParagraphSmall'}>Next</Block>
  </Button>
);

export default ContentNextButton;
