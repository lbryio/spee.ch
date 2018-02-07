import React from 'react';
import NavBar from 'containers/NavBar';

class ErrorPage extends React.Component {
  render () {
    const { error } = this.props;
    return (
      <div>
        <NavBar/>
        <div className="row row--padded">
            <p>{error}</p>
        </div>
      </div>
    );
  }
};

// required props
// error

export default ErrorPage;
