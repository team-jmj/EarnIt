import { Meteor } from 'meteor/meteor';
import { ExpenseCategory } from '../../api/expenseCategory/expenseCategory';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('ExpenseCategory', function publish() {
  if (this.userId) {
    const username = Meteor.user().username;

    return ExpenseCategory.find({ user: username });
  }
  return this.ready();
});
