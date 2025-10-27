import { html } from 'lit';
import './simple-greeting.js';
const meta = {
    title: 'Example/SimpleGreeting',
    tags: ['autodocs'],
    render: (args) => html `<simple-greeting .name=${args.name}></simple-greeting>`,
    argTypes: {
        name: { control: 'text' },
    },
};
export default meta;
export const Default = {
    args: {
        name: 'Somebody',
    },
};
export const WithCustomName = {
    args: {
        name: 'Kakà',
    },
};
export const WithLongName = {
    args: {
        name: 'Ricardo Izecson dos Santos Leite',
    },
};
export const WithEmptyName = {
    args: {
        name: '',
    },
};
//# sourceMappingURL=simple-greeting.stories.js.map