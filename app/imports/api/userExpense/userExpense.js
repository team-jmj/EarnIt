import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const UserExpense = new Mongo.Collection('UserExpense');

/** Create a schema to constrain the structure of documents associated with this collection. */
const UserExpenseSchema = new SimpleSchema({
  user: String,
  category_id: String,
  amount_spent: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserExpense.attachSchema(UserExpenseSchema);

/** Make the collection and schema available to other code. */
export { UserExpense, UserExpenseSchema };
