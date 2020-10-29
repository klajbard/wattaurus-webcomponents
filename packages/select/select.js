import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@wui/list'

export class Select extends LitElement {
  constructor() {
    super();
    this.disabled;
    this.open;
    this.value;
  }

  static get properties() {
    return {
      disabled: { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return css`
      .container {
        position: relative;
        max-width: 20rem;
      }
      .trigger {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
        align-items: center;
        width: 100%;
        height: 3rem;
        padding: 0.25rem 2.25rem 0.25rem 1.5rem;
        border-radius: 0;
        cursor: pointer;
        font-size:1rem;
      }
      .trigger::after {
        content: '';
        position: absolute;
        right: 0.5rem;
        top: 1.25rem;
        width: 0;
        height: 0;
        border: 0.5rem solid transparent;
        border-top-color: currentColor;
        border-bottom: 0;
      }
        
      .trigger.open::after {
        border: 0.5rem solid transparent;
        border-top: 0;
        border-bottom-color: currentColor;
      }
      
      .list {
        z-index: 1;
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        margin: 0;
        padding: 0;
        max-height: 20rem;
        border: 1px solid #aaa;
        background: white;
        border-top: 0;
        overflow-y: auto;
      }
      .list:not(.open) {
        display: none;
      }
    `;
  }

  _handleKeyDown(event) {
    const list = this.shadowRoot.querySelector("wui-list")
    if (list) {
      list.dispatchEvent(new CustomEvent("request-keydown", {
        bubbles: true,
        composed: true,
        detail: { key: event.key },
      }))
    }
  }

  _handleClick() {
    const oldValue = this.open;
    this.open = !this.open;
    this.requestUpdate('open', oldValue);
  }

  _handleUpdate(event) {
    const oldValue = this.value;
    this.value = event.detail.source.innerText;
    if (event.detail.triggerEvent === "click") {
      this.open = false;
    }
    this.requestUpdate('value', oldValue);
  }

  firstUpdated() {
    const button = this.shadowRoot.querySelector("#trigger")
  }

  render() {
    const triggerClass = classMap({
      "open": this.open
    })
    return html`
    <div class="container">
      <button id="trigger" class="trigger ${triggerClass}" @keydown=${this._handleKeyDown} @click=${this._handleClick}>
        <span>${this.value}</span>
      </button>
      <wui-list class="list ${triggerClass}" @selected-update=${this._handleUpdate}>
        <slot></slot>
      </wui-list>
    </div>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-select', Select);
