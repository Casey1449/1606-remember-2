import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      updateReminder(id) {
        this.get('store').findRecord('reminder', id).then((reminder) => {
          reminder.save().then((reminder) => { this.transitionToRoute('reminder-list.reminder-detail', reminder.id); });
        });
      },
      revertReminder(id) {
        this.get('store').findRecord('reminder', id).then((reminder) => {
          reminder.rollbackAttributes();
        });
      }
    }
});
