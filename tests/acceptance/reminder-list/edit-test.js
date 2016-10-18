import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | reminder list/edit', {
  beforeEach(){
    server.createList('reminder', 5);
  },
  afterEach(){
    server.shutdown();
  }
});

test('visiting the "edit" route', function(assert) {
  visit('5/edit');

  andThen(function() {
    assert.equal(currentURL(), '5/edit');
  });
});

test('editing a reminder', function(assert) {

  visit('5/edit');
  fillIn('.reminder-title-input', 'Some title');
  fillIn('.reminder-notes-input', 'Some notes');
  click('.reminder-submit-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title').text(), 'Some title');
    assert.equal(Ember.$('.reminder-detail-notes').text(), 'Some notes');
  });
});

test('revert a reminder', function(assert) {

  visit('5/edit');
  fillIn('.reminder-title-input', 'Hey');
  fillIn('.reminder-notes-input', 'How are you?');
  click('.reminder-submit-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title').text(), 'Hey');
    assert.equal(Ember.$('.reminder-detail-notes').text(), 'How are you?');
  });

  andThen(function() {
    click('.edit-button');
    fillIn('.reminder-title-input', 'Some title');
    fillIn('.reminder-notes-input', 'Some notes');
    click('.reminder-revert-button');
    visit('5');
  });

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title').text(), 'Hey');
    assert.equal(Ember.$('.reminder-detail-notes').text(), 'How are you?');
  });
});
