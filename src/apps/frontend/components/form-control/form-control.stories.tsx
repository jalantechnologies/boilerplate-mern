import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { FormControl, Input } from '..';

const meta: Meta<typeof FormControl> = {
  component: FormControl,
  tags: ['autodocs'],
  title: 'Components/FormControl',
};

export default meta;
type Story = StoryObj<typeof FormControl>;

const RenderDefault = (args) => {
  const [value, setValue] = useState('');

  return (
    <FormControl {...args}>
      <Input
        error={args.error as string}
        placeholder={'Enter your name here'}
        disabled={false}
        name={'name'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
};

const RenderPasswordForm = (args) => {
  const [value, setValue] = useState('');

  return (
    <FormControl {...args}>
      <Input
        error={args.error as string}
        placeholder={'Enter your password here'}
        type={'password'}
        disabled={false}
        name={'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
};

export const Default: Story = {
  args: {
    error: '',
    label: 'Name',
  },
  render: RenderDefault,
};

export const Password: Story = {
  args: {
    error: '',
    label: 'Password',
  },
  render: RenderPasswordForm,
};

export const FormWithError: Story = {
  args: {
    error: 'Name is required',
    label: 'Name',
  },
  render: RenderDefault,
};
