var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SimpleGreeting = class SimpleGreeting extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'Somebody';
    }
    render() {
        return html `
        <div>
            <h1>Hello</h1>
            <p>Hello, ${this.name}!</p>
        </div>`;
    }
};
SimpleGreeting.styles = css `
    :host{
        display: block;
        border: solid 2px red;
        padding: 16px;
        margin-top: 2px;
        background-color: #fff0f5;
    p { color: rebeccapurple; font-weight: bold; background-color: #f0f0f0; padding: 8px; }
    h1 { color: green; font-size: 24px; }
    }
    `;
__decorate([
    property()
], SimpleGreeting.prototype, "name", void 0);
SimpleGreeting = __decorate([
    customElement('simple-greeting')
], SimpleGreeting);
export { SimpleGreeting };
//# sourceMappingURL=simple-greeting.js.map