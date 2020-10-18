import { ListElem } from './list-elem';
import { fixture, html } from '@open-wc/testing';

const assert = chai.assert;

suite('wui-list-elem', () => {
  test('is defined', () => {
    const el = document.createElement('wui-list-elem');
    assert.instanceOf(el, ListElem);
  });

  test('renders with default value', async () => {
    const el = await fixture(html`<wui-list-elem></wui-list-elem>`);
    assert.shadowDom.equal(
      el,
      `<li class="list-elem">
        <slot></slot>
      </li>
    `
    );
  });
});
