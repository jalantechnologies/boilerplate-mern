import React from 'react';
import { Input, InputProps } from 'baseui/input';
import { Block } from 'baseui/block';
import { Theme } from 'baseui';

interface BaseUIStyleProps extends Theme {
  $theme: Theme;
  $isFocused: boolean;
}

export interface FormInputProps extends InputProps {
  testId?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  testId,
  value,
  ...otherProps
}) => (
  <Block
    position="relative"
    marginTop={['scale700', 'scale700', 'scale800', 'scale850']}
  >
    <Input
      {...otherProps}
      value={value}
      overrides={{
        Root: {
          props: {
            'data-testid': testId,
          },
          style: ({ $theme, $isFocused }: BaseUIStyleProps) => ({
            border: $isFocused
              ? `${$theme.sizing.scale0} solid ${$theme.colors.backgroundInverseSecondary}`
              : `${$theme.sizing.scale0} solid ${$theme.colors.backgroundTertiary}`,
          }),
        },
        InputContainer: {
          style: () => ({
            marginBottom: '0',
          }),
        },
        StartEnhancer: {
          style: ({ $theme }: BaseUIStyleProps) => ({
            color: $theme.colors.contentInverseSecondary,
            paddingLeft: $theme.sizing.scale0,
            paddingRight: $theme.sizing.scale0,
          }),
        },
        EndEnhancer: {
          style: ({ $theme }: BaseUIStyleProps) => ({
            color: $theme.colors.backgroundTertiary,
            paddingLeft: $theme.sizing.scale0,
          }),
        },
        MaskToggleButton: {
          style: ({ $theme }: BaseUIStyleProps) => ({
            color: $theme.colors.primaryA,
          }),
          props: {
            tabIndex: -1,
          },
        },
      }}
    />
  </Block>
);

export default FormInput;
