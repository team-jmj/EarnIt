import React from 'react';
import { Divider, Grid, Header, Loader, Segment, Card, Container, Icon } from 'semantic-ui-react';
import { ExpenseCategory, ExpenseCategorySchema } from '/imports/api/expenseCategory/expenseCategory';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import CategoryItem from '../components/CategoryList';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserExpenses extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { category } = data;
    const user = Meteor.user().username;

    ExpenseCategory.insert({ user,
      category}, this.insertCallback);

  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className="center-padding">
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                <p>Add Category</p>
              </Header>
              <AutoForm ref={(ref) => { this.formRef = ref; }}
                        schema={ExpenseCategorySchema} onSubmit={this.submit}>
                <Segment>
                  <TextField name='category' label='New Category'/>
                  <ErrorsField/>
                  <HiddenField name='user' value={Meteor.user().username}/>
                </Segment>
                <SubmitField value='Submit'/>
              </AutoForm>
            </Grid.Column>
          </Grid>

          <Divider horizontal>
            <Header as='h2'>
              <Icon name='table' />
              Your Expense Categories
            </Header>
          </Divider>

          <Container>
            <Card.Group itemsPerRow={4}>
              {this.props.categories.map((category) => <CategoryItem key={category._id} category={category} />)}
            </Card.Group>
          </Container>

        </div>
    );
  }
}

UserExpenses.propTypes = {
  categories: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('ExpenseCategory');

  return {
    categories: ExpenseCategory.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserExpenses);