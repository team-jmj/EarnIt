import React from 'react';
import { Icon, Card, Button, Modal, Container, Segment, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import DateField from 'uniforms-semantic/DateField';
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
    this.remove = this.remove.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Spending was added!' });
      this.formRef.reset();
    }
  }

  updateAlert(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'info', message: 'Spending was updated!' });
    }
  }

  removeAlert(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Remove failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'danger', message: 'Spending was removed!' });
    }
  }

  submit(data) {
    const { amount_spent, description, category_id, date, category_name } = data;
    const user = Meteor.user().username;

    UserExpense.insert({ user,
      category_id, amount_spent, description, date, category_name}, this.insertCallback);
  }

  update(data, id) {
    const { amount_spent, description, category_id, date, category_name } = data;

    UserExpense.update({_id: id}, { $set: { amount_spent, description, category_id, date, category_name } }, this.updateAlert);
  }

  remove(id) {
    UserExpense.remove({_id: id}, this.removeAlert);
  }

  render() {
    return (
        <Card color="blue">
            <Card.Content >
              <Card.Header style={{margin: '5%'}}>{this.props.category.category}</Card.Header>
              <Card.Description style={{margin: '5%'}}>{this.props.category.description}</Card.Description>
              <Modal trigger={<Button basic compact size="mini" color="red" style={{margin: '5%'}}>Add Spending</Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#FE3939', color: '#ffffff' }}>Add Spending - {this.props.category.category}</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                      <AutoForm ref={(ref) => { this.formRef = ref; }}
                                schema={UserExpenseSchema} onSubmit={this.submit}>
                        <Segment>
                          <DateField name="date" label="Date of Spending:"/>
                          <TextField name="amount_spent" label="Input Amount Spent:"/>
                          <TextField name="description" label="Description:"/>
                          <ErrorsField/>
                          <HiddenField name="user" value={Meteor.user().username}/>
                          <HiddenField name="category_id" value={this.props.category._id}/>
                          <HiddenField name="category_name" value={this.props.category.category}/>
                        </Segment>
                        <Container textAlign="center">
                          <Button basic compact size="large" color="red">Add Expense</Button>
                        </Container>
                      </AutoForm>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              <Modal trigger={<Button basic compact size="mini" color="green" style={{margin: '5%'}}>View Spending </Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#21BA45', color: '#ffffff' }}>View Spending - {this.props.category.category}</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                          <Table.HeaderCell>Amount</Table.HeaderCell>
                          <Table.HeaderCell>Description</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                          {UserExpense.find({category_id: this.props.category._id }).fetch().map((item, curr) => <Table.Row>
                            <Table.Cell key={curr}>{item.date.toDateString()}</Table.Cell>
                            <Table.Cell key={curr}>{item.amount_spent}</Table.Cell>
                            <Table.Cell key={curr}>{item.description}</Table.Cell>
                            <Table.Cell key={curr}>
                              <Modal trigger={<Button basic compact icon color="blue" content="Blue">Edit<Icon name="edit outline"/></Button>} closeIcon>
                                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#0E6EB8', color: '#ffffff' }}>Editing Spending</Modal.Header>
                                <Modal.Content>
                                  <Modal.Description>
                                    <AutoForm ref={(ref) => { this.formRef = ref; }}
                                              schema={UserExpenseSchema} onSubmit={(event) => this.update(event, item._id)} model={UserExpense.findOne(item._id)}>
                                      <Segment>
                                        <DateField name="date" label="Date of Spending:"/>
                                        <TextField name="amount_spent" label="Input Amount Spent:"/>
                                        <TextField name="description" label="Description:"/>
                                        <ErrorsField/>
                                        <HiddenField name="user" value={Meteor.user().username}/>
                                        <HiddenField name="category_id" value={this.props.category._id}/>
                                        <HiddenField name="category_name" value={this.props.category.category}/>
                                      </Segment>
                                      <Container textAlign="center">
                                        <Button basic compact size="large" color="blue">Edit Expense</Button>
                                      </Container>
                                    </AutoForm>
                                  </Modal.Description>
                                </Modal.Content>
                              </Modal>
                              <Button basic compact icon color="red" content="Red" onClick={() => this.remove(item._id)}>Remove<Icon name="trash alternate outline"/></Button>
                            </Table.Cell></Table.Row>)}
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
