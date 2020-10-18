import { LitElement, html, css } from 'lit-element';

export class List extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  firstUpdated() {
    const element = this.shadowRoot.querySelector('ul');
  }

  render() {
    return html`
      <ul id="list">
        <slot></slot>
      </ul>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-list', List);
