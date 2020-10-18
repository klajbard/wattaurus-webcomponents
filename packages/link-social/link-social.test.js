import { LinkSocial } from './link-social';
import { fixture, html } from '@open-wc/testing';

const assert = chai.assert;

suite('wui-link-social', () => {
  test('is defined', () => {
    const el = document.createElement('wui-link-social');
    assert.instanceOf(el, LinkSocial);
  });

  test('renders with default value', async () => {
    const el = await fixture(html`<wui-link-social></wui-link-social>`);
    assert.shadowDom.equal(
      el,
      `<div class="social-item">
        <div class="icon-container">
          <slot name="icon"></slot>
        </div>
        <a
          class="link custom"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="link-container">
            <slot></slot>
          </span>
        </a>
      </div>
    `
    );
  });

  test('renders with facebook style', async () => {
    const el = await fixture(html`<wui-link-social url="www.fb.com" type="facebook"></wui-link-social>`);
    assert.equal(el.type, 'facebook');
  });

  test('renders with instagram style', async () => {
    const el = await fixture(html`<wui-link-social url="www.fb.com" type="instagram"></wui-link-social>`);
    assert.equal(el.type, 'instagram');
  });
});
