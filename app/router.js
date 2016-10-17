import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('reminder-list', { path: '/' }, function() {
    this.route('reminder-detail', { path: ':id' });
    this.route('edit', { path: ':id/edit' });
    this.route('new');
  });
});

export default Router;
