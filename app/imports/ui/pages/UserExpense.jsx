import React from 'react';
import { Divider, Container, Button, Header, Card, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { ExpenseCategory, ExpenseCateSchema } from '/imports/api/expense/expense';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import HiddenField from 'uniforms-semantic/HiddenField';
import { Bert } from 'meteor/themeteorchef:bert';

class UserExpense extends React.Component {
  constructor(props) {
    console.log(ExpenseCategory.find().fetch());
    super(props);
    this.state = {user: Meteor.userId(), category_name: ''};
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  submit(data) {
    const { user, category_name } = data;

    ExpenseCategory.insert({
      user: user,
      category_name: category_name,
    }, this.insertCallback);
  }

  render() {
    return (
        <Container>
            <Header as="h2" textAlign="center">
              User Expenses
            </Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ExpenseCateSchema} onSubmit={this.submit}>
              <Segment>
                <HiddenField name='user' value={Meteor.userId()}/>
                <TextField name='category_name'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>

            <Divider/>

            <Card.Group itemsPerRow={4}>
              <Card color='green'>
                <Card.Content>
                  <Card.Header>
                    <div>{this.state.category_name}</div>
                  </Card.Header>
                  <Card.Meta>
                    <p>
                      Need to wear something better....
                    </p>
                    <Button color="green" size="mini" content="View Spending" />
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Card color='green'>
                <Card.Content>
                  <Card.Header>
                    <div>Apartment Rent</div>
                  </Card.Header>
                  <Card.Meta>
                    <p>
                      I need somewhere to stay...
                    </p>
                    <Button color="green" size="mini" content="View Spending" />
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Card color='green'>
                <Card.Content>
                  <Card.Header>
                    <div>Food</div>
                  </Card.Header>
                  <Card.Meta>
                    <p>
                      Hungry.....
                    </p>
                    <Button color="green" size="mini" content="View Spending" />
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Card color='green'>
                <Card.Content>
                  <Card.Header>
                    <div>Transport</div>
                  </Card.Header>
                  <Card.Meta>
                    <p>
                      I need gas for my car.....
                    </p>
                    <Button color="green" size="mini" content="View Spending" />
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Card color='green'>
                <Card.Content>
                  <Card.Header>
                    <div>School</div>
                  </Card.Header>
                  <Card.Meta>
                    <p>
                      Tuition.....
                    </p>
                    <Button color="green" size="mini" content="View Spending" />
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Card color='green'>
                <Card.Content>
                  <Card.Header>
                    <div>Clothes</div>
                  </Card.Header>
                  <Card.Meta>
                    <p>
                      Need to wear something better....
                    </p>
                    <Button color="green" size="mini" content="View Spending" />
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
        </Container>
    );
  }
}

export default UserExpense;
