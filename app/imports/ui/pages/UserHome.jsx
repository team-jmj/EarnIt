import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserHome extends React.Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      title:{
        text: "June Expenses"
      },
      data: [{
        type: "pie",
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

    let date = new Date();
    date = date.toDateString();

    return (
        <Container textAlign='center'>
          <h1>{date}</h1>
          <h1>This month you'be saved: $</h1>
          <Grid>
            <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
            />
          </Grid>
        </Container>
    );
  }
}

export default UserHome;














