import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '..';

const meta: Meta<typeof Input> = {
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    type: {
      control: {
        type: 'select',
      },
      options: [
        'text',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'month',
        'number',
        'password',
        'range',
        'search',
        'tel',
        'time',
        'url',
        'week',
      ],
    },
    value: { control: 'text' },
  },
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/InputField',
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your Name',
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter your password here',
    type: 'password',
  },
};

export const Email: Story = {
  args: {
    placeholder: 'Enter your email here',
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input field',
    type: 'text',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    placeholder: 'Disabled input field with value',
    type: 'text',
    value: 'This is a disabled input field',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Error input field',
    type: 'text',
    error: 'This is an error',
  },
};

export const Number: Story = {
  args: {
    placeholder: 'Enter your number here',
    type: 'number',
  },
};

export const Date: Story = {
  args: {
    placeholder: 'Enter your date here',
    type: 'date',
  },
};

export const Time: Story = {
  args: {
    placeholder: 'Enter your time here',
    type: 'time',
  },
};

export const DateTime: Story = {
  args: {
    placeholder: 'Enter your date and time here',
    type: 'datetime-local',
  },
};

export const Month: Story = {
  args: {
    placeholder: 'Enter your month here',
    type: 'month',
  },
};

export const Week: Story = {
  args: {
    placeholder: 'Enter your week here',
    type: 'week',
  },
};

export const Search: Story = {
  args: {
    placeholder: 'Search here',
    type: 'search',
  },
};
