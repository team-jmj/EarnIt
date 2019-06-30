import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Incomes, IncomeSchema } from '../../api/income/income';
import { Profiles } from '/imports/api/profile/profile';
import { check } from 'meteor/check';

/** Renders the Page for editing a single document. */
class EditIncome extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = { redirectToReferer: false };
    this.diff = 0;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Update succeeded' });
      Profiles.update(this.props.profile._id, {$inc: {savings: this.diff}}, (updateError, num) => {
        if (updateError) {
        } else {
        }
      });
      this.formRef.reset();
      this.setState({ redirectToReferer: true });
    }
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { date, name, amount, owner, _id } = data;

    check(name, String);
    check(amount, Number);

    this.diff = amount - this.props.doc.amount;

    Incomes.update(_id, { $set: { date, name, amount, owner } }, this.insertCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
      return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const { from } = { from: { pathname: '/profile' } };

    if (this.state.redirectToReferer) {
      return <Redirect to={ from }/>;
    }

    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Income</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={IncomeSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField type="date" name="date"/>
                <TextField name="name"/>
                <NumField name="amount"/>
                <SubmitField value="Edit"/>
                <ErrorsField/>
                <HiddenField name="owner"/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditIncome.propTypes = {
  doc: PropTypes.object,
  profile: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Profiles documents.
  const incomeSub = Meteor.subscribe('Incomes');
  const profileSub = Meteor.subscribe('ProfilesAndIncomes');

  return {
    doc: Incomes.findOne(documentId),
    profile: Profiles.findOne({}),
    ready: incomeSub.ready() && profileSub.ready(),
  };
})(EditIncome);
