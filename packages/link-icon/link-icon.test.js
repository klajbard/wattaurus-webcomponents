import { LinkIcon } from './link-icon';
import { fixture, html } from '@open-wc/testing';

const assert = chai.assert;

suite('wui-link-icon', () => {
  test('is defined', () => {
    const el = document.createElement('wui-link-icon');
    assert.instanceOf(el, LinkIcon);
  });

  test('renders with default value', async () => {
    const el = await fixture(html`<wui-link-icon>Link</wui-link-icon>`);
    assert.equal(el.textContent, 'Link');
    assert.equal(el.external, false);
    assert.equal(el.title, '');
    assert.equal(el.href, '');
    assert.shadowDom.equal(
      el,
      `<a class="link">
        <slot></slot>
      </a>
    `
    );
  });

  test('renders with all props', async () => {
    const el = await fixture(html`<wui-link-icon external href="www.homepage.com" title="webpage"></wui-link-icon>`);
    assert.equal(el.external, true);
    assert.equal(el.title, 'webpage');
    assert.equal(el.href, 'www.homepage.com');
    assert.shadowDom.equal(
      el,
      `<a class="link" href="www.homepage.com" title="webpage" rel="noopener noreferrer">
        <slot></slot>
      </a>
    `
    );
  });
});
