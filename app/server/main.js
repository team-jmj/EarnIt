import '/imports/startup/both';
import '/imports/startup/server';
import { Email } from 'meteor/email';

// obtain MAIL_URL and set in command line (export MAIL_URL="<url>")
//
// or
//
// add to settings.production.json (MAIL_URL: "<url>") and do
// process.env.MAIL_URL = Meteor.settings.MAIL_URL;
