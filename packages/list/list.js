import { LitElement, html, css } from 'lit-element';

export class List extends LitElement {
  constructor() {
    super();
    this.list = [];
    this.plain;
    this.selectedIndex = -1;
  }

  static get properties() {
    return {
      plain: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
      }
      .list {
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
      }
    `;
  }

  firstUpdated() {
    this.list = this.shadowRoot
      .querySelector('slot')
      .assignedNodes({ flatten: true })
      .reduce((acc, node) => {
        node.plain = (this.plain && node.plain === undefined) || node.plain;
        if (node.nodeType === Node.ELEMENT_NODE) {
          acc.push(node);
        }
        return acc;
      }, []);
  }

  handleSelection() {
    for (const listElem of this.list) {
      if (listElem.hasAttribute('wui-list-elem')) {
        listElem.selected = this.list.indexOf(listElem) === this.selectedIndex;
      }
    }
  }

  notifyUpdate(triggerElem) {
    const customEv = new CustomEvent('selected-update', {
      bubbles: true,
      composed: true,
      detail: { source: triggerElem },
    })

    this.dispatchEvent(customEv)
  }

  handleSelected(event) {
    const elements = event.composedPath();
    let index = -1, triggerElem = null;
    for (const elem of elements) {
      if (elem.nodeType === Node.ELEMENT_NODE && elem.hasAttribute('wui-list-elem')) {
        index = this.list.indexOf(elem);
        triggerElem = elem
      }
    }
    this.selectedIndex = index;

    this.notifyUpdate(triggerElem);
    this.handleSelection();
  }

  render() {
    return html`
      <ul id="list" class="list" @selected-request=${this.handleSelected}>
        <slot></slot>
      </ul>
    `;
  }
}

window && window.customElements && window.customElements.define('wui-list', List);
