/* globals server */

import { test, skip } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list', {
  beforeEach(){
    server.createList('reminder', 5);
  },
  afterEach(){
    server.shutdown();
  }
});

test('viewing the homepage', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('clicking on an individual item', function(assert) {

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), Ember.$('.spec-reminder-title').text().trim());
  });
});

test('clicking on the ➕ button displays the form', function(assert) {

  visit('/');
  click('.add-reminder-button');

  andThen(function() {
    assert.equal(currentURL(), '/new');
    assert.equal(Ember.$('.create-reminder-form').length, 1);
  });
});

test('clicking on the edit button takes you to the :id/edit url', function(assert) {

  visit('/');
  click('.reminder-list-item:last');
  click('.edit-button');

  andThen(function() {
    assert.equal(currentURL(), '/5/edit');
    assert.equal(Ember.$('.create-reminder-form').length, 1);
    assert.equal(Ember.$('.reminder-revert-button').length, 1);
  });
});

test('editing fields should show the revert button', function(assert) {

  visit('/');
  click('.reminder-list-item:last');

  andThen(function() {
    assert.equal(Ember.$('.reminder-revert-button').length, 0);
  });

  click('.edit-button');
  fillIn('.reminder-title-input', 'New');

  andThen(function() {
    assert.equal(Ember.$('.reminder-revert-button').length, 1);
  });
});

test('editing button should trigger warning', function(assert) {

  visit('/');
  click('.reminder-list-item:nth-child(5)');
  click('.edit-button');
  fillIn('.reminder-title-input', 'New');

andThen(function(){
  click('.reminder-list-item:nth-child(5)');
});

  andThen(function() {
    assert.equal(Ember.$('.dirty-warning-icon:visible').length, 1);
  });
});
