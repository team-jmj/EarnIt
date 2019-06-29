import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '/imports/api/profile/profile';
import { ExpenseCategory } from '/imports/api/expenseCategory/expenseCategory';
import { Container, Grid, Loader } from 'semantic-ui-react';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-us', { month: 'long' });

    const data = this.props.categories.map(x => {
      return {'y': Math.round(100 * (x.expenses / this.props.profile.expenses)), label: x.category};
    });

    const options1 = {
      animationEnabled: true,
      theme: 'light1',
      title: {
        text: month,
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        legendText: '{label}',
        indexLabelPlacement: 'outside',
        indexLabel: '{label}: {y}%',
        startAngle: -90,
        dataPoints: data,
      }],
    };
    const options2 = {
      animationEnabled: true,
      theme: 'light1',
      title: {
        text: year,
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        legendText: '{label}',
        indexLabelPlacement: 'outside',
        indexLabel: '{label}: {y}%',
        startAngle: -90,
        dataPoints: data,
      }],
    };

    date = date.toDateString();

    return (
        <Container textAlign="center">
          <h1>{date}</h1>
          <h1>This month you&apos;ve saved: ${this.props.profile.savings}</h1>
          <Grid centered container>
            <Grid.Column width={8}>
              <CanvasJSChart options={options1}
                  /* onRef={ref => this.chart = ref} */
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <CanvasJSChart options={options2}
                  /* onRef={ref => this.chart = ref} */
              />
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

UserHome.propTypes = {
  ready: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  categories: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const profileSub = Meteor.subscribe('ProfilesAndIncomes');
  const expenseSub = Meteor.subscribe('ExpenseCategory');

  return {
    profile: Profiles.findOne({}),
    categories: ExpenseCategory.find({}).fetch(),
    ready: profileSub.ready() && expenseSub.ready(),
  };
})(UserHome);
