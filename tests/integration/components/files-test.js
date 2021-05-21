import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Files', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the table of files', async function(assert) {
    assert.expect(1);

    await render(hbs`<Files @files={{@model.data}} />`);

    assert.dom('[data-test-table-component]').exists();
  });

  test('it renders the row with parent checkbox and download option', async function(assert) {
    assert.expect(1);

    await render(hbs`<Files @files={{@model.data}} />`);

    assert.dom('[data-test-select-all-and-download]').exists();
  });
});
