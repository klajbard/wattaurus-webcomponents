import { Button } from './button';
import { fixture, html } from '@open-wc/testing';

const assert = chai.assert;

suite('wui-button', () => {
  test('is defined', () => {
    const el = document.createElement('wui-button');
    assert.instanceOf(el, Button);
  });

  test('renders with default value', async () => {
    const el = await fixture(html`<wui-button>Button</wui-button>`);
    assert.equal(el.textContent, 'Button');
    assert.equal(el.outline, false);
    assert.equal(el.resetPadding, false);
    assert.equal(el.transparent, false);
    assert.shadowDom.equal(
      el,
      `
      <button id="button" class="button">
        <span class="icon-container"><slot name="icon"></slot></span>
        <span><slot></slot></span>
      </button>
    `
    );
  });

  test('renders with transparent class', async () => {
    const el = await fixture(html`<wui-button transparent></wui-button>`);
    assert.equal(el.transparent, true);
    assert.shadowDom.equal(
      el,
      `
      <button id="button" class="button transparent" >
        <span class="icon-container"><slot name="icon"></slot></span>
        <span><slot></slot></span>
      </button>
    `
    );
  });

  test('renders with no padding', async () => {
    const el = await fixture(html`<wui-button resetPadding></wui-button>`);
    assert.equal(el.resetPadding, true);
    assert.shadowDom.equal(
      el,
      `
      <button id="button" class="button no-padding" >
        <span class="icon-container"><slot name="icon"></slot></span>
        <span><slot></slot></span>
      </button>
    `
    );
  });

  test('renders with outline', async () => {
    const el = await fixture(html`<wui-button outline></wui-button>`);
    assert.equal(el.outline, true);
    assert.shadowDom.equal(
      el,
      `
      <button id="button" class="button outline" >
        <span class="icon-container"><slot name="icon"></slot></span>
        <span><slot></slot></span>
      </button>
    `
    );
  });

  test('click on button', async () => {
    const el = await fixture(html`<wui-button>Button</wui-button>`);
    const button = el.shadowRoot.querySelector('button');
    button.dispatchEvent(new Event('mousedown'));
    assert.equal(button.classList.contains('active'), true);
  });
});
