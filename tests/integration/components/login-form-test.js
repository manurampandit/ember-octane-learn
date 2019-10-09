import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LoginForm />`);
    assert.ok(this.element.textContent.includes('Select a user'), 'select a user text is present');

    const [select] = await findAll('select'); // pick the first element
    assert.ok(select, '<select> is found');
    assert.notOk(select.value, '<select> value is falsy');

    const [btn] = await findAll('input[type="submit"]');
    assert.ok(btn, '<input type="submit"> is found');
    assert.equal(btn.disabled, true, 'bbutton is initially disabled');

    await fillIn('select', '1');
    assert.equal(select.value, 1, '<select>.value=1');
    assert.equal(btn.disabled, false, '<button> is not disabled now');


  });
});
