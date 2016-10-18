import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    destroyReminder(reminder) {
      this.get('store').findRecord('reminder', reminder.id).then((reminder) => {
        reminder.destroyRecord().then(() => { this.get('routing').transitionTo('reminder-list'); });
      });
    }
  }

});
