import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '/imports/api/profile/profile';
import { ExpenseCategory } from '/imports/api/expenseCategory/expenseCategory';
import { UserExpense } from '/imports/api/userExpense/userExpense';
import { Incomes } from '/imports/api/income/income';
import { Container, Grid, Loader } from 'semantic-ui-react';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserHome extends React.Component {

  constructor(props) {
    super(props);
    this.today = new Date();
    this.thisMonth = this.today.getMonth();
    this.thisYear = this.today.getFullYear();
  }

  calcTotIncome() {
    const incomes = this.props.incomes.filter(income => income.date.getFullYear() === this.thisYear &&
        income.date.getMonth() === this.thisMonth);
    return incomes.reduce((acc, curr) =>  { return acc + curr.amount }, 0);
  }

  categorize(expenses, data) {
    let totExp = 0;

    expenses.forEach(expense => {
      const index = data.findIndex(cat => cat.label === expense.category_name);
      if (index !== -1) {
        data[index].y += expense.amount_spent;
      } else {
        data.push({y: expense.amount_spent, label: expense.category_name});
      }
      totExp += expense.amount_spent;
    });

    data.forEach(cat => {
      cat.y = Math.round(100 * (cat.y / totExp));
    });

    return totExp;
  }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const month = this.today.toLocaleString('en-us', { month: 'long' });

    let yearExp = this.props.expenses.filter(expense => expense.date.getFullYear() === this.thisYear);
    let monthExp = yearExp.filter(expense => expense.date.getMonth() === this.thisMonth);

    const monthData = [];
    const yearData = [];
    const totExp = this.categorize(monthExp, monthData);
    this.categorize(yearExp, yearData);

    const savings = this.calcTotIncome() - totExp;
    const diff = this.props.profile.goal - savings;
    let msg;
    if (diff === 0) {
      msg = 'You are at your savings goal!'
    } else if (diff > 0) {
      msg = 'You are over your savings goal by $' + diff;
    } else {
      msg = 'You are under your savings goal by $' + -diff;
    }

    const monthOpt = {
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
        dataPoints: monthData,
      }],
    };
    const yearOpt = {
      animationEnabled: true,
      theme: 'light1',
      title: {
        text: this.thisYear,
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        legendText: '{label}',
        indexLabelPlacement: 'outside',
        indexLabel: '{label}: {y}%',
        startAngle: -90,
        dataPoints: yearData,
      }],
    };

    return (
        <Container textAlign="center">
          <h1>{this.today.toDateString()}</h1>
          <h1>This month you&apos;ve saved: ${savings}</h1>
          <h2>{msg}</h2>
          <Grid centered container style={{padding: '50px 0 0 0'}}>
            <Grid.Column width={8}>
              <CanvasJSChart options={monthOpt}/>
            </Grid.Column>
            <Grid.Column width={8}>
              <CanvasJSChart options={yearOpt}/>
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
  expenses: PropTypes.array,
  incomes: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const expenseSub = Meteor.subscribe('UserExpense');
  const profileIncomeSub = Meteor.subscribe('ProfilesAndIncomes');
  const catSub = Meteor.subscribe('ExpenseCategory');

  return {
    expenses: UserExpense.find({}).fetch(),
    profile: Profiles.findOne({}),
    categories: ExpenseCategory.find({}).fetch(),
    incomes: Incomes.find({}).fetch(),
    ready: profileIncomeSub.ready() && expenseSub.ready() && catSub.ready(),
  };
})(UserHome);
