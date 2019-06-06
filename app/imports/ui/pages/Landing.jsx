import React from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import '../stylesheets/landing_stylesheet.css';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div id="landing">
            <Grid.Row id="grid_rows1">
                <p>Manage your money to increase your savings.</p>
            </Grid.Row>

            <Grid.Row id="grid_rows2">
                <p>Get motivated to achieve your goals.</p>
            </Grid.Row>

            <Grid.Row id="grid_rows3">
                <h1>EarnIt.</h1>
            </Grid.Row>

            <Grid.Row id="grid_rows4">
              <Button id="getstarted_button" size='big' color='blue' as={NavLink} activeClassName="active" exact to="/">
                Get Started!</Button>
            </Grid.Row>
        </div>
    );
  }
}

export default Landing;
