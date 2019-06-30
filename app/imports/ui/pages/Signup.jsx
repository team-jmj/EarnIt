import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Modal, Icon, Button} from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;

    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // Profiles.insert({ user: '', savings: '', owner: email });
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const { from } = { from: { pathname: '/profile' } };
    const maxLength = 6;

    if (this.state.redirectToReferer) {
      return <Redirect to={ from }/>;
    }

    return (
        <Container textAlign="left" style={{ borderRadius: '10%', padding: '5%', margin: '5%', width: '55%' }} fluid>
              <Segment style={{ padding: '10%', borderRadius: '10%'}}>
                  <Header as="h2" textAlign="center">
                    Register your EarnIt account!
                  </Header>
                  <Form onSubmit={this.handleSubmit}>
                      <Form.Input
                          label="Email"
                          icon="user"
                          iconPosition="left"
                          name="email"
                          type="email"
                          placeholder="E-mail address"
                          onChange={this.handleChange}
                      />
                      <Form.Input
                          label="Password"
                          icon="lock"
                          iconPosition="left"
                          name="password"
                          placeholder="Password"
                          type="password"
                          onChange={this.handleChange}
                      />
                      <Grid columns={2} textAlign="center">
                        <Grid.Row>
                          <Grid.Column>
                            {this.state.password.length < maxLength ? <p><span><Icon disabled name="circle" />At least 6 characters</span></p> : <p><span><Icon color="green" name="circle" />At Least 6 characters</span></p>}
                          </Grid.Column>
                          <Grid.Column>
                            {new RegExp('[0-9]').test(this.state.password) ? <p><span><Icon color="green" name="circle" />One number</span></p> : <p><span><Icon disabled name="circle" />One number</span></p>}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    <Container textAlign="center" style={{ margin: '5% 0%' }}>
                      {(this.state.password.length < maxLength) || !new RegExp('[0-9]').test(this.state.password) || !new RegExp('(.*)@(.*)[.]...').test(this.state.email) ? <Form.Button disabled content="Get Started!" type="submit"/> : <Form.Button positive content="Get Started!" type="submit"/>
                      }
                    </Container>
                  </Form>
                <Container textAlign="center" style={{ margin: '5% 0%' }}>
                  <p>
                    <b>By clicking Get Started, you agree to EarnIt&apos;s&nbsp;</b>
                    <Modal trigger={<Button basic compact size="mini" color="blue">Privacy Policy</Button>} closeIcon>
                      <Modal.Header style={{ textAlign: 'center', backgroundColor: '#21BA45', color: '#ffffff' }}>Privacy Policy</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <p>
                            Effective date: June 04, 2019
                          </p>
                          <p>
                            EarnIt (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the pending website (hereinafter referred to as the &quot;Service&quot;).
                          </p>
                          <p>
                            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. The Privacy Policy for EarnIt has been created with the help of TermsFeed.
                          </p>
                          <p>
                            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from pending
                          </p>

                          <Header as="h4">Definitions</Header>
                          <ul>
                            <li>
                              Service is the pending website operated by EarnIt
                            </li>
                            <li>
                              Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).
                            </li>
                            <li>
                              Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                            </li>
                            <li>
                              Cookies are small files stored on your device (computer or mobile device).
                            </li>
                          </ul>


                          <Header as="h4">Information Collection and Use</Header>
                          <p>
                            We collect several different types of information for various purposes to provide and improve our Service to you.
                          </p>


                          <Header as="h5">Types of Data Collected</Header>
                          <Header as="h5"><em>Personal Data</em></Header>
                          <p>
                            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&quot;Personal Data&quot;). Personally identifiable information may include, but is not limited to:
                          </p>

                          <ul>
                            <li>Email address</li>
                            <li>Cookies and Usage Data</li>
                          </ul>

                          <Header as="h5"><em>Usage Data</em></Header>
                          <p>
                            We may also collect information how the Service is accessed and used (&quot;Usage Data&quot;). This Usage Data may include information such as your computer&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                          </p>

                          <Header as="h5"><em>Tracking Cookies Data</em></Header>
                          <p>
                            We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.
                          </p>
                          <p>
                            Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyse our Service.
                          </p>
                          <p>
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                          </p>
                          <p>
                            Examples of Cookies we use:
                          </p>
                          <ul>
                            <li><b>Session Cookies</b>: We use Session Cookies to operate our Service.</li>
                            <li><b>Preference Cookies</b>: We use Preference Cookies to remember your preferences and various settings.</li>
                            <li><b>Security Cookies</b>: We use Security Cookies for security purposes.</li>
                          </ul>

                          <Header as="h4">Use of Data</Header>
                          <p>EarnIt uses the collected data for various purposes:</p>
                          <ul>
                            <li>To provide and maintain the Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                            <li>To provide customer care and support</li>
                            <li>To provide analysis or valuable information so that we can improve the Service</li>
                            <li>To monitor the usage of the Service</li>
                            <li>To detect, prevent and address technical issues</li>
                          </ul>

                          <Header as="h4">Transfer Of Data</Header>
                          <p>Your information, including Personal Data, may be transferred to - and maintained on - computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
                          <p>If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</p>
                          <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                          <p>EarnIt will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>

                          <Header as="h4">Disclosure Of Data</Header>
                          <Header as="h5">Legal Requirements</Header>
                          <p>
                            EarnIt may disclose your Personal Data in the good faith belief that such action is necessary to:
                          </p>
                          <ul>
                            <li>To comply with a legal obligation</li>
                            <li>To protect and defend the rights or property of EarnIt</li>
                            <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                            <li>To protect the personal safety of users of the Service or the public</li>
                            <li>To provide analysis or valuable information so that we can improve the Service</li>
                            <li>To monitor the usage of the Service</li>
                            <li>To protect against legal liability</li>
                          </ul>
                          <p>
                            As an European citizen, under GDPR, you have certain individual rights. You can learn more about these guides in the GDPR Guide.
                          </p>

                          <Header as="h4">Security of Data</Header>
                          <p>
                            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                          </p>

                          <Header as="h4">Service Providers</Header>
                          <p>
                            We may employ third party companies and individuals to facilitate our Service (&quot;Service Providers&quot;), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                          </p>
                          <p>
                            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                          </p>

                          <Header as="h4">Links to Other Sites</Header>
                          <p>
                            Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit.
                          </p>
                          <p>
                            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                          </p>

                          <Header as="h4">Children&apos;s Privacy</Header>
                          <p>
                            Our Service does not address anyone under the age of 18 (&quot;Children&quot;).
                          </p>
                          <p>
                            We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
                          </p>

                          <Header as="h4">Changes to This Privacy Policy</Header>
                          <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                          </p>
                          <p>
                            We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the &quot;effective date&quot; at the top of this Privacy Policy.
                          </p>
                          <p>
                            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                          </p>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </p>
                </Container>
                {this.state.error === '' ? '' : <Message
                        error
                        header="Registration was not successful"
                        content={this.state.error}
                    />}
                  <Message>
                    Already have an account? <Link to="/signin">Login in here</Link>
                  </Message>
              </Segment>
        </Container>
    );
  }
}
