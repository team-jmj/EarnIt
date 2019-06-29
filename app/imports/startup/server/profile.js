import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { Incomes } from '../../api/income/income';

const newUser = 0;

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

if (Profiles.find().count() === newUser) {
  if (Meteor.settings.defaultData) {
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addData(data) {
  Profiles.insert(data);
}
