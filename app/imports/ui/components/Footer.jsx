import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '30px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
            Team JMJ
          </div>
        </footer>
    );
  }
}

export default Footer;
