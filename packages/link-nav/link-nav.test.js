import { LinkNav } from './link-nav';
import { fixture, html } from '@open-wc/testing';

const assert = chai.assert;

suite('wui-link-nav', () => {
  test('is defined', () => {
    const el = document.createElement('wui-link-nav');
    assert.instanceOf(el, LinkNav);
  });

  test('renders with default value', async () => {
    const el = await fixture(html`<wui-link-nav>Link</wui-link-nav>`);
    assert.equal(el.textContent, 'Link');
    assert.equal(el.external, false);
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
    const el = await fixture(html`<wui-link-nav external href="www.homepage.com" title="webpage"></wui-link-nav>`);
    assert.equal(el.title, 'webpage');
    assert.equal(el.external, true);
    assert.equal(el.href, 'www.homepage.com');
    assert.shadowDom.equal(
      el,
      `<a class="link" href="www.homepage.com" title="webpage" rel="noopener noreferrer">
        <slot></slot>
      </a>
    `
    );
  });

  test('renders with href only', async () => {
    const el = await fixture(html`<wui-link-nav external href="www.homepage.com"></wui-link-nav>`);
    const button = el.shadowRoot.querySelector('a');
    assert.equal(el.href, button.title);
  });
});
