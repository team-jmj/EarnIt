import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { UserExpense, UserExpenseSchema } from '/imports/api/userExpense/userExpense';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders a single row in the List Category table.*/
class UserExpenseTable extends React.Component {
  constructor(props) {
    super(props);

    // Meteor.subscribe('UserExpense');
    Meteor.subscribe('UserExpense', function() {
      UserExpense.find({user: Meteor.user().username});
    });
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>
            Test
          </Table.Cell>
          <Table.Cell>
            1.50
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default UserExpenseTable;
