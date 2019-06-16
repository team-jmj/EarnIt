import '/imports/startup/both';
import '/imports/startup/server';
import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';

// obtain MAIL_URL and set in command line (export MAIL_URL="<url>")
//
// or
//
// add to settings.production.json (MAIL_URL: "<url>")
// process.env.MAIL_URL = Meteor.settings.MAIL_URL;

Meteor.methods({
  findAccount(email) {
    const account = Accounts.findUserByUsername(email);
    return account;
  },
  validateLoginAttempt(validateLoginCallback) {

  }
});

// Meteor.users.deny({ update: () => true });
