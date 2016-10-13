import { moduleForModel, test } from 'ember-qunit';

moduleForModel('reminder-list', 'Unit | Model | reminder list', {
  // Specify the other units that are required for this test.
  needs: ['model:reminder']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
