import React from 'react';
import { Card, Button, Modal, Container, Segment, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import HiddenField from 'uniforms-semantic/HiddenField';
import { UserExpense, UserExpenseSchema } from '/imports/api/userExpense/userExpense';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders a single row in the List Category table.*/
class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add Success!' });
      this.formRef.reset();
    }
  }

  submit(data) {
    const { amount_spent, category_id, date, year, month } = data;
    const user = Meteor.user().username;

    UserExpense.insert({ user,
      category_id, amount_spent, date, year, month}, this.insertCallback);
  }

  render() {
    const today = new Date();
    const months = ['January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'];

    return (
        <Card color="blue">
            <Card.Content >
              <Card.Header style={{margin: '5%'}}>{this.props.category.category}</Card.Header>
              <Modal trigger={<Button basic compact size="mini" color="red" style={{margin: '5%'}}>Add Spending</Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#FE3939', color: '#ffffff' }}>Add Spending</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                      <AutoForm ref={(ref) => { this.formRef = ref; }}
                                schema={UserExpenseSchema} onSubmit={this.submit}>
                        <Segment>
                          <TextField name="amount_spent" label="Input Amount Spent:"/>
                          <ErrorsField/>
                          <HiddenField name="user" value={Meteor.user().username}/>
                          <HiddenField name="category_id" value={this.props.category._id}/>
                          <HiddenField name="date" value={months[today.getMonth() + 1] + ' ' + today.getDate() + ', ' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()}/>
                          <HiddenField name="year" value={today.getFullYear()}/>
                          <HiddenField name="month" value={months[today.getMonth() + 1]}/>
                        </Segment>
                        <Container textAlign="center">
                          <Button basic compact size="large" color="red" onClick={this.addSpendingClicked}>Add Expense</Button>
                        </Container>
                      </AutoForm>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              <Modal trigger={<Button basic compact size="mini" color="green" style={{margin: '5%'}}>View Spending</Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#21BA45', color: '#ffffff' }}>View Spending</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                          <Table.HeaderCell>Amount</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                          {UserExpense.find({category_id: this.props.category._id }).fetch().map((item,i) => <Table.Row><Table.Cell key={i}>{item.date}</Table.Cell>
                            <Table.Cell key={i}>{item.amount_spent}</Table.Cell></Table.Row>)}
                      </Table.Body>
                    </Table>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
CategoryItem.propTypes = {
  category: PropTypes.object,
};

// export default CategoryItem;
export default withTracker(() => {
  const subscription = Meteor.subscribe('UserExpense');

  return {
    expenses: UserExpense.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CategoryItem);
