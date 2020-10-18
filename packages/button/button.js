import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export class Button extends LitElement {
  constructor() {
    super();
    this.onclick;
    this.outline = false;
    this.resetPadding = false;
    this.transparent = false;
  }

  static get properties() {
    return {
      onclick: { attribute: false },
      outline: { type: Boolean },
      resetPadding: { type: Boolean },
      transparent: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .wui-button {
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
      .wui-button:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: var(--wui-button-shadow-color, #00888e);
        opacity: 0;
      }
      .wui-button:hover:before {
        opacity: 0.1;
      }
      .wui-button:focus::before {
        opacity: 0.3;
      }
      .wui-button:after {
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
      .wui-button.active:after {
        clip-path: circle(100%);
        opacity: 0;
        transition: clip-path 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 0.4s ease-out;
        transition-delay: -0.1s, 0.25s;
      }
      .wui-button--transparent {
        background-color: transparent;
        color: var(--wui-button-main-color, #00888e);
      }
      .wui-button--no-padding {
        padding: 0;
      }
      .wui-button--outline {
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
    const classNames = classMap({
      'wui-button--transparent': this.transparent,
      'wui-button--no-padding': this.resetPadding,
      'wui-button--outline': this.outline,
    });
    return html`
      <button id="button" class="wui-button ${classNames}" @onclick=${this.onclick} @mousedown=${this._handleMouseDown}>
        <span class="icon-container"><slot name="icon"></slot></span>
        <span><slot></slot></span>
      </button>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-button', Button);
