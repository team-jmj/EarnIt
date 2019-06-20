import { Meteor } from 'meteor/meteor';
import { UserExpense } from '../../api/userExpense/userExpense';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('UserExpense', function publish() {
  if (this.userId) {
    const username = Meteor.user().username;

    return UserExpense.find({ user: username });
  }
  return this.ready();
});
