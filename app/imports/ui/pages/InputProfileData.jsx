import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Profiles, ProfileSchema } from '../../api/profile/profile';

/** Renders the Page for adding a document. */
class InputProfileData extends React.Component {
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
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
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
      this.setState({ redirectToReferer: true });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { user, goal } = data;
    const owner = Meteor.user().username;

    Profiles.insert({ user, goal, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const { from } = { from: { pathname: '/profile' } };

    if (this.state.redirectToReferer) {
      return <Redirect to={ from }/>;
    }

    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Create a Profile</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ProfileSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name="user" label="Name:"/>
                <NumField name="goal" label="Monthly Savings Goal:"/>
                <SubmitField value="Create"/>
                <ErrorsField/>
                <HiddenField name="owner"/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default InputProfileData;
