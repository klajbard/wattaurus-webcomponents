import { LitElement, html, css } from 'lit-element';

export class LinkNav extends LitElement {
  constructor() {
    super();
    this.href = '';
    this.external = false;
  }

  static get properties() {
    return {
      external: { type: Boolean },
      href: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      .link {
        cursor: pointer;
        position: relative;
        color: currentColor;
        text-decoration: none;
        border: none;
        outline: none;
      }
      .link:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out 0s;
      }
      .link:link:hover:after,
      .link:link:focus:after {
        visibility: visible;
        transform: scaleX(1);
      }
    `;
  }

  firstUpdated() {
    const element = this.shadowRoot.querySelector('a');
    if (!this.external) element.removeAttribute('rel');
    if (!this.href) element.removeAttribute('href');
    if (!this.title && !this.href) element.removeAttribute('title');
  }

  render() {
    return html`
      <a class="link" href=${this.href} title=${this.title || this.href} rel="noopener noreferrer">
        <slot></slot>
      </a>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-link-nav', LinkNav);
