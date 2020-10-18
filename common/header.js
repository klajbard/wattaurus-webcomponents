import { LitElement, html, css } from 'lit-element'
import '@wui/button'

export class Header extends LitElement {
  constructor() {
    super()
    this.showBack
  }

  static get properties() {
    return {
      showBack: { type: Boolean },
    }
  }

  static get styles() {
    return css`
      header {
        box-sizing: border-box;
        height: 4rem;
        display: flex;
        background-color: #003f42;
        color: #fff;
        padding: 0.5rem 2rem;
      }
      .content {
        display: flex;
        flex-wrap: wrap-reverse;
        align-items: center;
      }
      .button-content {
        font-weight: bold;
      }
      .title {
        margin: 0;
        margin-left: 1rem;
        font-weight: bold;
        font-size: 1.5rem;
      }
    `
  }

  _handleClick() {
    window.location.href = '../'
  }

  _renderButton() {
    if (this.showBack) {
      return html`
        <wui-button @click=${this._handleClick} outline transparent style=${'--wui-button-main-color: #00d1db'}>
          <span class="button-content">&lArr;</span>
        </wui-button>
      `
    }
  }

  render() {
    return html`
      <header>
        <div class="content">
          ${this._renderButton()}
          <h1 class="title"><slot></slot></h1>
        </div>
      </header>
    `
  }
}

window && window.customElements && window.customElements.define('wui-header', Header)
