import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static override styles = css`
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

  @property()
  name = 'Somebody';

  override render() {
    return html`
        <div>
            <h1>Hello</h1>
            <p>Hello, ${this.name}!</p>
        </div>`;
  }
}
