import { module, test } from 'qunit';
import { click, visit, currentURL, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting the index page', async function(assert) {
    assert.expect(1);

    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('download button state changes on selection', async function(assert) {
    assert.expect(2);

    await visit('/');

    //When not clicking on any checkboxes
    assert.dom('[data-test-download-button]').isDisabled();

    //When clicking on the first input checkbox
    await click('input.child-checkbox:first-child');

    assert.dom('[data-test-download-button]').isEnabled();
  });

  test('clicking select all checks all checkboxes', async function(assert) {
    assert.expect(5);

    await visit('/');

    //When clicking on the first input checkbox
    await click('input#select-all');

    findAll('input.child-checkbox').forEach((el) => {
      assert.dom(el).isChecked();
    })
  });

  test('clicking on checkbox updates the count status', async function(assert) {
    assert.expect(4);

    await visit('/');

    assert.dom('[data-test-selection-status]').hasText('None selected');

    //When clicking on the first input checkbox
    await click('input.child-checkbox:first-child');

    assert.dom('[data-test-selection-status]').hasText('Selected 1');

    //When clicking on select all
    await click('input#select-all');

    assert.dom('[data-test-selection-status]').hasText('All selected');

    // When clicking again and expect all checkboxes to be unselected
    await click('input#select-all');

    assert.dom('[data-test-selection-status]').hasText('None selected');
  });

  test('indeterminate state occurs when selecting some checkboxes', async function(assert) {
    assert.expect(1);

    await visit('/');

    await click('input.child-checkbox:first-child');

    let newStatus = document.getElementById('select-all').indeterminate;

    assert.ok(newStatus, 'the checkbox is rendered as indeterminate');
  })

   test('window displays the available and selected files to download', async function(assert) {
    assert.expect(1);

    let originalAlert = window.alert;
    window.alert = (text) => {
      assert.equal('You are about to download: Targaryen, \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe, Lannister, \\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', text);
    }

    await visit('/');

    await click('input#select-all');
    await click('[data-test-download-button]');

    window.alert = originalAlert;
  })
});
