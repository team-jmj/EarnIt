import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Incomes = new Mongo.Collection('Incomes');

/** Create a schema to constrain the structure of documents associated with this collection. */
const IncomeSchema = new SimpleSchema({
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  owner: {
    type: String,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Incomes.attachSchema(IncomeSchema);

/** Make the collection and schema available to other code. */
export { Incomes, IncomeSchema };
