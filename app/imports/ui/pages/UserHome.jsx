import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserHome extends React.Component {
  render() {
    let date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-us', { month: 'long' });

    const options1 = {
      animationEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      title:{
        text: month
      },
      data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        indexLabelPlacement: "outside",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: 20, label: "Bills" },
          { y: 24, label: "Rent" },
          { y: 20, label: "Food" },
          { y: 14, label: "School" },
          { y: 12, label: "Leisure" },
          { y: 10, label: "Other" }
        ]
      }]
    };
    const options2 = {
      animationEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      title:{
        text: year
      },
      data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        indexLabelPlacement: "outside",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: 20, label: "Bills" },
          { y: 24, label: "Rent" },
          { y: 20, label: "Food" },
          { y: 14, label: "School" },
          { y: 12, label: "Leisure" },
          { y: 10, label: "Other" }
        ]
      }]
    };

    date = date.toDateString();
    return (
        <Container textAlign='center'>
          <h1>{date}</h1>
          <h1>This month you've saved: $</h1>
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

export default UserHome;








