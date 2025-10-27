import type { StorybookConfig } from '@storybook/web-components-vite';
 
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: '@storybook/web-components-vite',
};
 
export default config;