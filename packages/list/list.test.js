import { List } from './list';
import { fixture, html } from '@open-wc/testing';

const assert = chai.assert;

suite('wui-list', () => {
  test('is defined', () => {
    const el = document.createElement('wui-list');
    assert.instanceOf(el, List);
  });

  test('renders with default value', async () => {
    const el = await fixture(html`<wui-list></wui-list>`);
    assert.shadowDom.equal(
      el,
      `<ul class="list" id="list">
        <slot></slot>
      </ul>
    `
    );
  });

  test('renders with no interaction', async () => {
    const el = await fixture(html`<wui-list plain></wui-list>`);
    assert.equal(el.plain, true);
  });
});
