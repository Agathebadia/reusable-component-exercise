import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | file', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the file cells', async function(assert) {
    assert.expect(5);

    // outer context taken by the component test
    this.set('toggle', function() {
    })

    this.set('file', {
      name: 'Blob',
      device: 'Laptop',
      path: '//file.path/',
      status: 'available',
    });

    this.set('selected', false),
    this.set('index', 4),

    await render(hbs`<File @file={{this.file}} @toggle={{this.toggle}} @selected={{this.selected}} @index={{this.index}} />`);

    //Can't use .dom, hasText as it is not rendering the entire page and outer context
    assert.ok(this.element.querySelector('[data-test-file-checkbox]'));
    assert.equal(this.element.querySelector('[data-test-file-name]').textContent.trim(), 'Blob');
    assert.equal(this.element.querySelector('[data-test-file-device]').textContent.trim(), 'Laptop');
    assert.equal(this.element.querySelector('[data-test-file-path]').textContent.trim(), '//file.path/');
    assert.equal(this.element.querySelector('[data-test-file-status]').textContent.trim(), 'available');
  });
});
