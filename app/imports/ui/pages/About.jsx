import React from 'react';
import { Container, Tab } from 'semantic-ui-react';

class About extends React.Component {
  render() {
    const panes = [
      { menuItem: '1', render: () => <Tab.Pane attached={false}>
          EarnIt is an online money management tool that strives to not only help you track your personal finances,
          but also motivate you to EARN your savings. We want you to feel accomplished about meeting your financial goals.
        </Tab.Pane> },
      { menuItem: '2', render: () => <Tab.Pane attached={false}>
          EarnIt allows you to set a monthly savings goal, then log and categorize every transaction, for both money coming in and going out. Throughout the month, you will be able to see how much you&apos;ve saved so far and monthly and yearly graphs showing your spendings by categories.
        </Tab.Pane> },
      { menuItem: '3', render: () => <Tab.Pane attached={false}>
          Signup up or login now if you haven&apos;t already if you want to be on top of your finances! EARN it! <br/><br/>
          Visit our wiki for more information and a step-by-step user guide: <a href={'https://github.com/team-jmj/EarnIt/wiki'}>https://github.com/team-jmj/EarnIt/wiki</a>
        </Tab.Pane> },
    ];

    return (
        <Container>
          <Container textAlign="center"><h1>What is EarnIt?</h1></Container>
          <Tab menu={{ pointing: true }} panes={panes} />
        </Container>
    );
  }
}

export default About;
