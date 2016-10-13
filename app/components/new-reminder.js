import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  
  title: '',
  date: '',
  notes: '',

  actions: {
    createReminder() {
      console.log('create function fired');
      const reminder = this.getProperties('title', 'date', 'notes');
      this.get('store').createRecord('reminder', reminder).save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
    }
  }
});
