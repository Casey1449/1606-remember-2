import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | reminder list/new', {
  beforeEach(){
    server.createList('reminder', 5);
  },
  afterEach(){
    server.shutdown();
  }
});

test('visiting the "new" route', function(assert) {
  visit('/new');

  andThen(function() {
    assert.equal(currentURL(), '/new');
  });
});

test('submitting a new reminder', function(assert) {

  visit('/new');
  fillIn('.reminder-title-input', 'Some title');
  fillIn('.reminder-notes-input', 'Some notes');
  click('.reminder-submit-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item').length, 6);
    assert.equal(Ember.$('.spec-reminder-item:last').text(), 'Some title');
    assert.equal(Ember.$('.reminder-item-notes:last').text(), 'Some notes');
  });
});
