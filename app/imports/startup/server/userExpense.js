import { Meteor } from 'meteor/meteor';
import { UserExpense } from '../../api/userExpense/userExpense';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.user} (${data.category})`);
  UserExpense.insert(data);
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('UserExpense', function publish() {
  if (this.userId) {
    const username = Meteor.user().username;

    return ExpenseCategory.find({ user: username });
  }
  return this.ready();
});
