import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';

/** Renders a single row in the List Category table.*/
class CategoryItem extends React.Component {
  render() {
    return (
        <Card color='green'>
            <Card.Content>
              <Card.Header>{this.props.category.category}</Card.Header>
              <Button color="green" size="mini" content="View Spending" />
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
