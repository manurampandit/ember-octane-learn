import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubAuthService from 'shlack/tests/stubs/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubAuthService);
  })

  test('visiting teams page and hit logout redirects to login', async function(assert) {
    await visit('/teams');

    assert.equal(currentURL(), '/teams');

    await click('.team-sidebar__logout-button');

    assert.equal(currentURL(), '/login');

  });
});
