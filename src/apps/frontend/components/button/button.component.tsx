import {
  Button as BaseButton, ButtonProps as BaseButtonProps,
} from 'baseui/button';
import React from 'react';

export interface ButtonProps extends BaseButtonProps {
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  fullWidth = false,
  ...props
}) => (
    <BaseButton
      {...props}
      overrides={{
        BaseButton: {
          style: () => ({
            width: fullWidth ? '100%' : 'auto',
          }),
        },
      }}
    />
);

export default Button;
