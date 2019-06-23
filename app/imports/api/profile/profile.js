import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Profiles = new Mongo.Collection('Profiles');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ProfileSchema = new SimpleSchema({
  user: {
    type: String,
    optional: true,
  },
  savings: {
    type: Number,
    optional: true,
  },
  goal: {
    type: Number,
    optional: true,
  },
  expenses: {
    type: Number,
    optional: true,
  },
  owner: {
    type: String,
    optional: true,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profiles.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema };
