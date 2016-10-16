import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      updateReminder(id) {
        this.get('store').findRecord('reminder', id).then((reminder) => {
          reminder.save();
        });
    }
  }
});
