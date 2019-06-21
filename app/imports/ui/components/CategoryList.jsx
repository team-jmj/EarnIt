import React from 'react';
import { Confirm, Icon, Card, Button, Modal, Container, Segment, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import DateField from 'uniforms-semantic/DateField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import HiddenField from 'uniforms-semantic/HiddenField';
import { UserExpense, UserExpenseSchema } from '/imports/api/userExpense/userExpense';
import { ExpenseCategory } from '/imports/api/expenseCategory/expenseCategory';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders a single row in the List Category table.*/
class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.remove = this.remove.bind(this);
    this.categoryRemove = this.categoryRemove.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.updateAlert = this.updateAlert.bind(this);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

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

  categoryRemoveAlert(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Remove failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'danger', message: 'Category was removed!' });
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

  categoryRemove(id) {
    for (let userExpense of UserExpense.find({category_id: id}).fetch()) {
      UserExpense.remove({_id: userExpense._id});
    }
    ExpenseCategory.remove({_id: id}, this.categoryRemoveAlert);
  }

  render() {
    return (
        <Card>
            <Card.Content >
              <Card.Header style={{margin: '5%'}}>{this.props.category.category}</Card.Header>
              <Card.Description style={{margin: '5%'}}>{this.props.category.description}</Card.Description>
              <Modal trigger={<Button basic compact size="mini" color="blue" style={{margin: '5%'}}>Add Spending</Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#0E6EB8', color: '#ffffff' }}>Add Spending - {this.props.category.category}</Modal.Header>
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
                          <Button basic compact size="large" color="blue">Add Expense</Button>
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
                              <Modal trigger={<Button basic compact icon color="yellow" content="Blue">Edit<Icon name="edit outline"/></Button>} closeIcon>
                                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#FFD700', color: '#ffffff' }}>Editing Spending</Modal.Header>
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
                                        <Button basic compact size="large" color="yellow">Edit Expense</Button>
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
          <div>
            <Button basic fluid icon onClick={this.open} color="red">Remove <Icon name="delete"/></Button>
            <Confirm
                open={this.state.open}
                onCancel={this.close}
                content="Are you sure you want to remove this category?"
                cancelButton="Cancel"
                confirmButton="Remove the category"
                size='large'
                onConfirm={() => this.categoryRemove(this.props.category._id)} />
          </div>
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
