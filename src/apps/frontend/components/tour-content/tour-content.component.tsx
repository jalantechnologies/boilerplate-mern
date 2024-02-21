import { PopoverContentProps } from '@reactour/tour';
import { Block } from 'baseui/block';
import React from 'react';

import ContentCloseButton from './content-close-button';
import ContentEndButton from './content-end-button';
import ContentNextButton from './content-next-button';
import ContentPreviousButton from './content-previous-button';
import ContentSkipButton from './content-skip-button';

const TourContent: React.FC<PopoverContentProps> = ({
  currentStep,
  setCurrentStep,
  setIsOpen,
  steps,
}: PopoverContentProps) => {
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const { content, position } = steps[currentStep];

  const contentContainerMargin = {
    left: '0px',
    top: '0px',
    right: '0px',
    bottom: '0px',
  };
  const tipPosition = {
    top: '',
    right: '',
    bottom: '',
    left: '',
  };

  let tipRotation = '';

  switch (position) {
    case 'left':
      tipPosition.top = 'scale800';
      tipPosition.right = '5px';
      contentContainerMargin.right = 'scale600';
      tipRotation = '90deg';
      break;
    case 'right':
      tipPosition.top = 'scale600';
      tipPosition.left = '5px';
      contentContainerMargin.left = 'scale600';
      tipRotation = '-90deg';
      break;
    case 'top':
      tipPosition.bottom = '5px';
      tipPosition.left = 'scale900';
      contentContainerMargin.bottom = 'scale600';
      tipRotation = '180deg';
      break;
    default:
      tipPosition.top = '1px';
      tipPosition.left = 'scale900';
      contentContainerMargin.top = 'scale600';
      tipRotation = '0deg';
  }

  return (
    <Block
      backgroundColor={'white'}
      marginBottom={contentContainerMargin.bottom}
      marginLeft={contentContainerMargin.left}
      marginRight={contentContainerMargin.right}
      marginTop={contentContainerMargin.top}
      paddingBottom={'scale600'}
      paddingLeft={'scale800'}
      paddingRight={'scale800'}
      paddingTop={'scale600'}
      style={{
        borderRadius: '22px',
      }}
    >
      <Block
        bottom={tipPosition.bottom}
        left={tipPosition.left}
        position="absolute"
        right={tipPosition.right}
        top={tipPosition.top}
      >
        <img
          alt="Message Tip"
          src="/assets/svgs/message-tip.svg"
          style={{
            transform: `rotate(${tipRotation})`,
          }}
        />
      </Block>
      <Block display="flex" gridGap="scale600" flexDirection="column">
        <ContentCloseButton setIsOpen={setIsOpen} />
        <Block>{content as string}</Block>
        <Block
          alignItems="center"
          display="flex"
          gridGap="scale600"
          justifyContent="space-between"
        >
          <>
            {!isFirstStep && (
              <ContentPreviousButton setCurrentStep={setCurrentStep} />
            )}
            {!isLastStep && <ContentSkipButton setIsOpen={setIsOpen} />}
            {!isLastStep && (
              <ContentNextButton setCurrentStep={setCurrentStep} />
            )}
            {isLastStep && <ContentEndButton setIsOpen={setIsOpen} />}
          </>
        </Block>
      </Block>
    </Block>
  );
};

export default TourContent;
