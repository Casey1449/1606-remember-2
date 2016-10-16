export default function() {
  this.get('/reminders');
  this.post('/reminders');
  this.get('/reminders/:id');
  this.patch('/reminders/:id');
  this.put('/reminders/:id');
  this.del('/reminders/:id');
}
