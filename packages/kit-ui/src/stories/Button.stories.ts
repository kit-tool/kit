import { fn } from '@storybook/test';
import { Button } from './Button';
import { Meta } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    variant: 'default',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: { control: 'check', description: '按钮点击事件' },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: '按钮大小',
      table: { defaultValue: { summary: 'default' } },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn(), size: 'default' },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    children: 'Button',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
    children: 'Button',
  },
};

export const Sm = {
  args: {
    size: 'sm',
    children: 'Button',
  },
};

export const Lg = {
  args: {
    size: 'lg',
    children: 'Button',
  },
};
