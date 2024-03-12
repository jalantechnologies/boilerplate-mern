import type { Meta, StoryObj } from '@storybook/react';
import {
  withRouter,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

import Sidebar from './index';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ['autodocs'],
  title: 'Components/Sidebar',
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isSidebarOpen: {
      control: 'boolean',
    },
  },
  args: {
    isSidebarOpen: true,
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

export const TasksMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/tasks',
        handle: 'Tasks',
      },
    }),
  },
};
