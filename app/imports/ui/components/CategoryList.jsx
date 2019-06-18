import React from 'react';
import { Card, Button, Modal, Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import HiddenField from 'uniforms-semantic/HiddenField';
import { ExpenseCategory, ExpenseCategorySchema } from '/imports/api/expenseCategory/expenseCategory';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Category table.*/
class CategoryItem extends React.Component {
  addSpendingClicked() {
    console.log('Clicked!');
  }

  render() {
    return (
        <Card color="green">
            <Card.Content >
              <Card.Header style={{margin: '5%'}}>{this.props.category.category}</Card.Header>
              <Modal trigger={<Button basic compact size="mini" color="red" style={{margin: '5%'}}>Add Spending</Button>} closeIcon>
                <Modal.Header style={{ textAlign: 'center', backgroundColor: '#FE3939', color: '#ffffff' }}>Add Spending</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                      <AutoForm ref={(ref) => { this.formRef = ref; }}
                                schema={ExpenseCategorySchema} onSubmit={this.submit}>
                        <Segment>
                          <TextField name="category" label="Input Amount Spent:"/>
                          <ErrorsField/>
                          <HiddenField name="user" value={Meteor.user().username}/>
                        </Segment>
                        <Container textAlign="center">
                          <Button basic compact size="large" color="red" onClick={this.addSpendingClicked}>Add Expense</Button>
                        </Container>
                      </AutoForm>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              <Modal trigger={<Button basic compact size="mini" color="green" style={{margin: '5%'}}>View Spending</Button>} closeIcon>
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
