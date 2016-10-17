import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateReminder() {
      this.get('store').findRecord('reminder', reminder).then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
    }
  }
});
