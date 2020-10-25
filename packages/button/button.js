import { LitElement, html, css } from 'lit-element';

export class Button extends LitElement {
  constructor() {
    super();
    this.outline = false;
    this.transparent = false;
  }

  static get properties() {
    return {
      outline: { type: Boolean, reflect: true },
      transparent: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        vertical-align: top;
      }
      .button {
        background: var(--wui-button-main-color, #00888e);
        color: var(--wui-button-secondary-color, #fff);
        border: none;
        border-radius: 0.5rem;
        outline: none;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        padding: var(--wui-button-padding, 0.5rem 0.75rem);
        transition: opacity 0.3s ease-in;
        vertical-align: middle;
      }
      .button:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: var(--wui-button-shadow-color, #00888e);
        opacity: 0;
      }
      .button:hover:before {
        opacity: 0.1;
      }
      .button:focus::before {
        opacity: 0.3;
      }
      .button:after {
        content: '';
        position: absolute;
        top: var(--top);
        left: var(--left);
        transform: translate(-50%, -50%);
        width: var(--size);
        height: var(--size);
        background: currentColor;
        clip-path: circle(0%);
        opacity: 0.3;
        border-radius: inherit;
      }
      .active:after {
        clip-path: circle(100%);
        opacity: 0;
        transition: clip-path 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 0.4s ease-out;
        transition-delay: -0.1s, 0.25s;
      }
      :host([transparent]) .button {
        background-color: transparent;
        color: var(--wui-button-main-color, #00888e);
      }
      :host([outline]) .button {
        color: var(--wui-button-main-color, #00888e);
        box-shadow: inset 0 0 0 1px var(--wui-button-main-color, #00888e);
        background: var(--wui-button-secondary-color, transparent);
      }
      .icon-container {
        display: inline-flex;
      }
      ::slotted(svg) {
        height: 1em;
        width: 1em;
        margin-right: 0.5em;
      }
    `;
  }

  _handleMouseDown(event) {
    const button = this.shadowRoot.querySelector('#button');
    const { offsetX, offsetY } = event;
    const { width, height } = button.getBoundingClientRect();
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 500);
    button.style.setProperty('--top', `${(offsetY / height) * 100}%`);
    button.style.setProperty('--left', `${(offsetX / width) * 100}%`);
    const dx = offsetX > width / 2 ? offsetX : width - offsetX;
    const dy = offsetY > height / 2 ? offsetY : height - offsetY;
    const size = Math.sqrt(dx ** 2 + dy ** 2) * 2;
    button.style.setProperty('--size', `${size}px`);
  }

  render() {
    return html`
      <button id="button" class="button" @mousedown=${this._handleMouseDown}>
        <span class="icon-container"><slot name="icon"></slot></span>
        <span><slot></slot></span>
      </button>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-button', Button);
