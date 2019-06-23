import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { Incomes } from '../../api/income/income';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('ProfilesAndIncomes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;

    return [
      Profiles.find({ owner: username }), Incomes.find({ owner: username }),
    ];
  }

  return this.ready();
});

if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.user}'s profile`);
  Profiles.insert(data);
}
