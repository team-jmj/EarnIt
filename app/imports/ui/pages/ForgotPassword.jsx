import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import { Container, Grid, Input, Button, Message, Segment } from 'semantic-ui-react';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', sent: false, error: '' };
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSend() {
    Accounts.forgotPassword({email: this.state.email}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({sent: true, error: ''});
      }
    });
    this.setState({ email: '', sent: false, error: '' });
  }

  handleChange(e) {
    this.setState({email: e.target.value});
  };

  render() {
    let message = '';
    if (this.state.sent && this.state.error === '') {
      message =
      <Message
          success
          header="Email sent with link to rest password"
      />
    } else if (this.state.error) {
      message =
      <Message
          error
          header="Email was not sent"
          content={this.state.error}
      />
    }
    return (
        <Grid centered container columns={3}>
          <Grid.Column verticalAlign='middle' width={2}>
            Enter email:
          </Grid.Column>
          <Grid.Column verticalAlign='middle' width={3}>
              <Input icon='mail outline' iconPosition='left' value={this.state.email} onChange={this.handleChange}/>
          </Grid.Column>
          <Grid.Column verticalAlign='middle' width={2}>
              <Button onClick={this.handleSend}>Send</Button>
          </Grid.Column>
          {message}
        </Grid>
    );
  }
}

export default ForgotPassword;















