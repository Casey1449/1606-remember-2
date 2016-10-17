import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({

  deserialize(serialized) {
    if (serialized){
      return moment(serialized).format("dddd, MMM Do, h:mm a");
    }
    return serialized;
  },

  serialize(deserialized){
    if(deserialized){
      return moment(deserialized).toISOString();
    }  
    return deserialized;
  }

});
