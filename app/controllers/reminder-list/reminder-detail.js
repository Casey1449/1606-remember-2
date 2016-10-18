import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    destroyReminder(id) {
      this.get('store').findRecord('reminder', id).then((reminder) => {
        reminder.destroyRecord().then(() => { this.transitionToRoute('reminder-list'); });
      });
    }
  }

});
