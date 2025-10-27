import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './simple-greeting.js';

const meta: Meta = {
  title: 'Example/SimpleGreeting',
  tags: ['autodocs'],
  render: (args) => html`<simple-greeting .name=${args.name}></simple-greeting>`,
  argTypes: {
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    name: 'Somebody',
  },
};

export const WithCustomName: Story = {
  args: {
    name: 'Kakà',
  },
};

export const WithLongName: Story = {
  args: {
    name: 'Ricardo Izecson dos Santos Leite',
  },
};

export const WithEmptyName: Story = {
  args: {
    name: '',
  },
};