import { StoryObj, Meta } from '@storybook/react';

import { ButtonKind } from '../../types/button';

import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    kind: {
      control: {
        type: 'select',
      },
      options: Object.values(ButtonKind),
    },
    onClick: {
      action: 'clicked',
    },
  },
} as Meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click Me',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    isLoading: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    kind: ButtonKind.SECONDARY,
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary',
    kind: ButtonKind.TERTIARY,
  },
};
