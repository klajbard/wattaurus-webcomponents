import { LitElement, html, css } from 'lit-element';

export class List extends LitElement {
  constructor() {
    super();
    this.list = [];
    this.plain;
    this.selectedIndex = -1;
    this.addEventListener('request-keydown', this._handleKeyDown);
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

  notifyUpdate(triggerElem, triggerEvent) {
    const customEv = new CustomEvent('selected-update', {
      bubbles: true,
      composed: true,
      detail: { source: triggerElem, triggerEvent },
    })

    this.dispatchEvent(customEv)
  }

  selectItem(index, triggerEvent) {
    const triggerElem = this.list[index]
    this.selectedIndex = index;

    this.notifyUpdate(triggerElem, triggerEvent);
    this.handleSelection();
  }

  handleSelected(event) {
    const elements = event.composedPath();
    let index = -1;
    for (const elem of elements) {
      if (elem.nodeType === Node.ELEMENT_NODE && elem.hasAttribute('wui-list-elem')) {
        index = this.list.indexOf(elem);
        this.selectItem(index, "click");
        break;
      }
    }
  }

  _handleKeyDown(event) {
    switch (event.detail.key) {
      case "ArrowDown":
        if (this.selectedIndex < this.list.length - 1) {
          this.selectItem(this.selectedIndex + 1, "keyDown");
        }
        break;
      case "ArrowUp":
        if (this.selectedIndex > 0) {
          this.selectItem(this.selectedIndex - 1, "keyDown");
        }
        break;
    }
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
