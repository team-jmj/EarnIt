import React from 'react';
import { Card, Button, Modal, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';

/** Renders a single row in the List Category table.*/
class CategoryItem extends React.Component {
  render() {
    return (
        <Card color='green'>
            <Card.Content >
              <Card.Header style={{margin: "5%"}}>{this.props.category.category}</Card.Header>
              <Modal trigger={<Button basic compact size="mini" color="red" style={{margin: "5%"}}>Add Spending</Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#FE3939', color: '#ffffff' }}>Add Spending</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Container textAlign="center">
                      <Button basic centered compact size="large" color="red">Add Expense</Button>
                    </Container>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              <Modal trigger={<Button basic compact size="mini" color="green" style={{margin: "5%"}}>View Spending</Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#21BA45', color: '#ffffff' }}>View Spending</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
CategoryItem.propTypes = {
  category: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CategoryItem);
