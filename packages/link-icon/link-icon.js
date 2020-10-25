import { LitElement, html, css } from 'lit-element';

export class LinkIcon extends LitElement {
  constructor() {
    super();
    this.href = '';
    this.title = '';
    this.external = false;
  }

  static get properties() {
    return {
      external: { type: Boolean },
      href: { type: String },
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      .link {
        position: relative;
        display: inline-flex;
        color: var(--wui-link-icon-color, #00888e);
        border-width: 2px;
        border-radius: 0.5rem;
        border-style: solid;
        border-color: transparent;
        padding: 0.5rem;
        outline: none;
      }
      .link:not(:first-child) {
        margin-left: 1rem;
      }
      .link:after,
      .link:before {
        content: '';
        width: 0%;
        height: 0%;
        position: absolute;
        visibility: hidden;
        border-radius: 0.5rem;
      }
      .link:after {
        border-left: 4px solid currentColor;
        border-bottom: 4px solid currentColor;
        transition: width 0.05s ease 0.05s, height 0.05s ease, visibility 0s 0.1s;
        bottom: -2px;
        right: -2px;
      }
      .link:before {
        border-top: 4px solid currentColor;
        border-right: 4px solid currentColor;
        transition: width 0.05s ease 0.15s, height 0.05s ease 0.1s, visibility 0s 0.2s;
        top: -2px;
        left: -2px;
      }
      .link:focus:before,
      .link:focus:after,
      .link:hover:before,
      .link:hover:after {
        width: 100%;
        height: 100%;
        visibility: visible;
      }
      .link:hover:before,
      .link:focus:before {
        transition: width 0.05s ease, height 0.05s ease 0.05s;
      }
      .link:hover:after,
      .link:focus:after {
        transition: width 0.05s ease 0.1s, height 0.05s ease 0.15s, visibility 0s 0.1s;
      }
      ::slotted(svg) {
        height: var(--wui-link-icon-svg-size, 3rem);
        width: var(--wui-link-icon-svg-size, 3rem);
      }
    `;
  }

  firstUpdated() {
    const element = this.shadowRoot.querySelector('a');
    if (!this.external) element.removeAttribute('rel');
    if (!this.href) element.removeAttribute('href');
    if (!this.title) element.removeAttribute('title');
  }

  render() {
    return html`
      <a class="link" href=${this.href} rel="noopener noreferrer" title=${this.title}>
        <slot></slot>
      </a>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-link-icon', LinkIcon);
