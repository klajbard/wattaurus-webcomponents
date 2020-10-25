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
        <span class="content">
          <slot>
          </slot>
          <slot name="sub">
          </slot>
        </span>
      </li>
    `
    );
  });

  test('renders with facebook style', async () => {
    const el = await fixture(html`<wui-link-social interactive></wui-link-social>`);
    assert.equal(el.interactive, true);
  });

  test('renders with instagram style', async () => {
    const el = await fixture(html`<wui-link-social selected></wui-link-social>`);
    assert.equal(el.selected, true);
    assert.shadowDom.equal(
      el,
      `<li class="list-elem" selected>
        <slot></slot>
      </li>
    `
    );
  });
});
