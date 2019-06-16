import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const ExpenseCategory = new Mongo.Collection('ExpenseCategory');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ExpenseCateSchema = new SimpleSchema({
  user: {type: String},
  category_name: {type: String},
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ExpenseCategory.attachSchema(ExpenseCateSchema);

/** Make the collection and schema available to other code. */
export { ExpenseCategory, ExpenseCateSchema };
