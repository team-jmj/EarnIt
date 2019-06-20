import { Meteor } from 'meteor/meteor';
import { Incomes } from '../../api/income/income';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Incomes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;

    return Incomes.find({ owner: username });
  }

  return this.ready();
});
