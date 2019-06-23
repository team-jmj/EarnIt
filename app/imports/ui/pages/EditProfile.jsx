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
import { Profiles, ProfileSchema } from '../../api/profile/profile';
import { Redirect } from 'react-router-dom';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = { redirectToReferer: false };
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Update succeeded' });
      this.formRef.reset();
      this.setState({ redirectToReferer: true });
    }
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { user, goal, owner, _id } = data;

    Profiles.update(_id, { $set: { user, goal, owner } }, this.insertCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
      return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
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
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ProfileSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='user'/>
                <NumField name='goal'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Profiles documents.
  const subscription = Meteor.subscribe('ProfilesAndIncomes');
  return {
    doc: Profiles.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);
