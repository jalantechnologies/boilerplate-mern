import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '..';
import { AccountProvider, AuthProvider } from '../../contexts';

const RenderHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <AccountProvider>
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </AccountProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: RenderHeader,
};
