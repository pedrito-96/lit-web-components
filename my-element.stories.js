import { html } from 'lit';
import './my-element.js';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Example/MyElement',
    tags: ['autodocs'],
    render: (args) => html `<my-element 
    .name=${args.name} 
    .count=${args.count}
    @count-changed=${(e) => console.log('Count changed:', e.detail)}
  ></my-element>`,
    argTypes: {
        name: { control: 'text' },
        count: { control: 'number' },
    },
};
export default meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
    args: {
        name: 'World',
        count: 0,
    },
};
export const WithCustomName = {
    args: {
        name: 'Storybook User',
        count: 0,
    },
};
export const WithInitialCount = {
    args: {
        name: 'Counter',
        count: 5,
    },
};
export const WithSlotContent = {
    args: {
        name: 'World',
        count: 0,
    },
    render: (args) => html `<my-element 
    .name=${args.name} 
    .count=${args.count}
  >
    <p>This is slotted content!</p>
    <span style="color: blue;">You can add any HTML here.</span>
  </my-element>`,
};
//# sourceMappingURL=my-element.stories.js.map