import { Meta, StoryObj } from '@storybook/react';

import Select from '.';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

export default {
  args: {
    options,
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    multiple: { control: 'boolean' },
    value: { control: 'text' },
  },
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Select',
} as Meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

export const PreSelected: Story = {
  args: {
    value: '3',
  },
};

export const WithLoading: Story = {
  args: {
    isLoading: true,
  },
};
