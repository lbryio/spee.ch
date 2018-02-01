import React from 'react';
import NavBar from 'containers/NavBar';

class ErrorPage extends React.Component {
  render () {
    return (
      <div>
        <NavBar/>
        <div className="row row--padded">
            <p>{this.props.error}</p>
        </div>
      </div>
    );
  }
};

// required props
// error

export default ErrorPage;
