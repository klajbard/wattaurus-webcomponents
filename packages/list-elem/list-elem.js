import { LitElement, html, css } from 'lit-element';

export class ListElem extends LitElement {
  constructor() {
    super();
    this.logo;
    this.plain;
    this.selected;
  }

  static get properties() {
    return {
      logo: { type: Boolean },
      plain: { type: Boolean, reflect: true },
      selected: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        padding-top: 0px;
        padding-bottom: 0px;
        padding-left: var(--wui-list-elem-side-padding, 1.5rem);
        padding-right: var(--wui-list-elem-side-padding, 1.5rem);
        outline: none;
        height: 3rem;
        cursor: default;
        color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
      }
      :host([wui-list-elem]) {
        cursor: pointer;
      }
      :host([wui-list-elem]:hover) {
        background-color: rgba(230, 230, 230, 0.7);
      }
      :host([selected]) {
        background-color: rgba(222, 222, 222, 0.7);
      }
      .content {
        display: flex;
        flex-direction: column;
      }
      slot + slot {
        font-size: 0.75rem;
      }
      .list-elem {
        display: flex;
        align-items: center;
      }
      .icon {
        margin-right: 0.5rem;
      }
      .icon ::slotted(svg) {
        height: 1.5rem;
        width: 1.5rem;
      }
    `;
  }

  handleClick() {
    this.fireSelectedRequest(this.selected, 'interaction');
  }

  fireSelectedRequest(selected, source) {
    if (this.plain) {
      return;
    }

    const customEv = new CustomEvent('selected-request', {
      bubbles: true,
      composed: true,
      detail: { source, selected },
    });

    this.dispatchEvent(customEv);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.plain) {
      this.setAttribute('wui-list-elem', '');
    }
    this.addEventListener('click', this.handleClick, { passive: true });
  }

  plainChanged() {
    if (this.plain) {
      this.removeAttribute('wui-list-elem');
      this.selected = false;
    } else {
      this.setAttribute('wui-list-elem', '');
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((_, propName) => {
      if (propName === 'plain') this.plainChanged();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }

  renderIcon() {
    if (this.logo) {
      return html`
        <span class="icon">
          <slot name="icon"></slot>
        </span>
      `;
    } else {
      return html``;
    }
  }

  render() {
    return html`
      <li class="list-elem">
        ${this.renderIcon()}
        <span class="content">
          <slot></slot>
          <slot name="sub"></slot>
        </span>
      </li>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-list-elem', ListElem);
