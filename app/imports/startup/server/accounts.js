import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const newUser = 0;

function createUser(email, password, role) {
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === newUser) {
  if (Meteor.settings.defaultAccounts) {
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  }
}
