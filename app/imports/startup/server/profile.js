import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/profile';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Profiles', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;

    return Profiles.find({ owner: username });
  }

  return this.ready();
});

