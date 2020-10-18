import { LitElement, html, css, unsafeCSS } from 'lit-element';

export class ListElem extends LitElement {
  constructor() {
    super();
    this.entity;
  }

  static get properties() {
    return {
      entity: { type: String },
    };
  }

  static get styles() {
    return css`
      .list-elem {
        display: block;
      }
      .list-elem::before {
        content: var(--wui-list-elem-icon, '➡');
        margin-left: -1.5em;
        margin-right: 0.5em;
      }
    `;
  }

  render() {
    return html`
      <li class="list-elem">
        <slot></slot>
      </li>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-list-elem', ListElem);
