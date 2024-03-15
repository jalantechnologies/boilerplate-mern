import { StoryObj, Meta } from '@storybook/react';

import OTP from '.';

export default {
  argTypes: {
    isLoading: { control: 'boolean' },
    onBlur: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    onError: {
      table: {
        disable: true,
      },
    },
  },
  component: OTP,
  tags: ['autodocs'],
  title: 'Components/Otp',
} as Meta;

type Story = StoryObj<typeof OTP>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'Error message',
  },
};

export const WithLoading: Story = {
  args: {
    isLoading: true,
  },
};
