import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import { Grid, Input, Button, Message } from 'semantic-ui-react';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', error: ''};
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSend() {
    // console.log(this.state.email);
    const email = this.state.email;
    Accounts.forgotPassword({email: email}, function(e) {
      if (e) {
        // this.setState({error: e.reason});
        console.log(this.state.error);
      }
    });
  }

  handleChange(e) {
    this.setState({email: e.target.value});
  };

  render() {
    return (
        <Grid centered container>
          <Grid.Column width={3}>
            Enter email:
          </Grid.Column>
          <Grid.Column width={3}>
            <Input icon='mail outline' iconPosition='left' value={this.state.email} onChange={this.handleChange}/>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button onClick={this.handleSend}>Send</Button>
          </Grid.Column>
          {this.state.error === '' ? (
              ''
          ) : (
              <Message
                  error
                  header="Email was not successful"
                  content={this.state.error}
              />
          )}
        </Grid>
    );
  }
}

export default ForgotPassword;















