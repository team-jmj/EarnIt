import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Grid, Segment, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Profiles } from '/imports/api/profile/profile';
import { Incomes, IncomeSchema } from '/imports/api/income/income';
import { IncomeItem } from '/imports/ui/components/IncomeItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-semantic/AutoForm';
import DateField from 'uniforms-semantic/DateField';
import ListAddField from 'uniforms-semantic/ListAddField';
import ListField from 'uniforms-semantic/ListField';
import NestField from 'uniforms-semantic/NestField';
import ListItemField from 'uniforms-semantic/ListItemField';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
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
    const { date, name, amount } = data;
    const owner = Meteor.user().username;
    // const _id = this.props.profiles._id;

    Incomes.insert({ date, name, amount, owner }, this.insertCallback);
  }

  // /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
          <Container>
            <Grid container centered>
              <Grid.Column>
                <Header as="h1" textAlign="center">Your Profile</Header>
                <Segment id="profile_segment">
                  <Icon name="user"/>User : {this.props.profiles.user}
                  <hr/>
                  <Icon name="dollar"/>Monthly Savings Goal : {this.props.profiles.savings}
                  <hr/>
                  <Button id="editbutton" as={Link} to={`/edit/${this.props.profiles._id}`}>Edit</Button>
                </Segment>
              </Grid.Column>
              </Grid>
              <Header as="h2" textAlign="center">Add Income</Header>
                <AutoForm ref={(ref) => { this.formRef = ref; }} schema={IncomeSchema} onSubmit={this.submit}>
                  <Segment>
                    <DateField name='date'/>
                    <TextField name='name'/>
                    <NumField name='amount'/>
                    <SubmitField value='Add'/>
                    <ErrorsField/>
                    <HiddenField name='owner' value='fakeuser@foo.com'/>
                  </Segment>
                </AutoForm>
            <Header as="h2">Income History</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.incomes.map((income) => <IncomeItem key={income._id} income={income} />)}
              </Table.Body>
            </Table>
          </Container>
        );
  }
}

/** Require an array of Profile documents in the props. */
Profile.propTypes = {
  profiles: PropTypes.array,
  incomes: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('ProfilesAndIncomes');

  return {
    profiles: Profiles.findOne({}),
    incomes: Incomes.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Profile);
