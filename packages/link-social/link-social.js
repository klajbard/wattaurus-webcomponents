import { LitElement, html, css } from 'lit-element';

export class LinkSocial extends LitElement {
  constructor() {
    super();
    this.url;
    this.type;
  }

  static get properties() {
    return {
      url: { type: String },
      type: { type: String },
    };
  }

  static get styles() {
    return css`
      .social-item {
        display: inline-flex;
        align-items: center;
        height: 4rem;
      }
      .icon-container {
        height: 100%;
        background-color: var(--wui-link-social-left-background, #2f2f2f);
        color: var(--wui-link-social-text-color, #fff);
        display: flex;
        align-items: center;
        width: 4rem;
        justify-content: center;
        position: relative;
      }
      .icon-container::after {
        position: absolute;
        content: '';
        right: -0.5rem;
        transform: rotate(45deg);
        border: 0.5rem solid var(--wui-link-social-left-background, #2f2f2f);
        z-index: 1;
      }
      .icon-container svg,
      ::slotted(svg) {
        width: 2rem;
      }
      .link {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        color: white;
        width: 20rem;
        text-align: center;
        padding-left: 1.5rem;
        text-decoration: none;
        line-height: 2rem;
        outline: none;
      }
      .link:link:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: var(--wui-link-social-shadow-color, #dfdfdf);
        opacity: 0;
      }
      .link:link:hover:before {
        opacity: 0.1;
      }
      .link:link:focus::before {
        opacity: 0.2;
      }
      .facebook {
        background-color: #3b5998;
      }
      .instagram {
        background: radial-gradient(circle at 5% 170%, #515bd4 5%, #8134af 25%, #dd2a7b 55%, #b19853 80%, #f58529 95%);
      }
      .custom {
        background: var(--wui-link-social-icon-background, #000);
      }
    `;
  }

  firstUpdated() {
    const element = this.shadowRoot.querySelector('a');
    if (!this.url) element.removeAttribute('href');
  }

  render() {
    const svgFacebook = html`
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="32px" width="32px" viewBox="0 0 32 32">
        <title>facebook</title>
        <path
          fill="currentColor"
          d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z"
        ></path>
      </svg>
    `;
    const svgInsta = html`
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="32px" width="32px" viewBox="0 0 32 32">
        <title>instagram</title>
        <path
          fill="currentColor"
          d="M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z"
        ></path>
        <path
          fill="currentColor"
          d="M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z"
        ></path>
        <path
          fill="currentColor"
          d="M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z"
        ></path>
      </svg>
    `;
    const customIcon = html`<slot name="icon"></slot>`;
    const icon = this.type === 'instagram' ? svgInsta : this.type === 'facebook' ? svgFacebook : customIcon;
    const classNames = [
      'link',
      this.type === 'instagram' ? 'instagram' : this.type === 'facebook' ? 'facebook' : 'custom',
    ].join(' ');
    return html`
      <div class="social-item">
        <div class="icon-container">
          ${icon}
        </div>
        <a class=${classNames} href=${this.url} target="_blank" rel="noopener noreferrer">
          <span class="link-container">
            <slot></slot>
          </span>
        </a>
      </div>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-link-social', LinkSocial);
