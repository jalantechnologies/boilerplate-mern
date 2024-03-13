import React, { ReactElement } from 'react';

import FlexItem from '../flex/flex-item.component';
import Flex from '../flex/flex.component';

import FormBody from './form-body.component';
import FormHeader from './form-header.component';

interface FormContainerProps {
  body: ReactElement;
  navigateBackwardURL?: string;
  title: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  body,
  navigateBackwardURL,
  title,
}) => (
    <Flex direction="column" gap={8}>
      <FlexItem alignSelf="stretch">
        <FormHeader
          navigateBackwardURL={navigateBackwardURL}
        >
          {title}
        </FormHeader>
      </FlexItem>
      <FlexItem alignSelf="stretch">
        <FormBody>
          {body}
        </FormBody>
      </FlexItem>
    </Flex>
);

export default FormContainer;
