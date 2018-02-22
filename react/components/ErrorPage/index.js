import React from 'react';
import PropTypes from 'prop-types';
import NavBar from 'containers/NavBar';

class ErrorPage extends React.Component {
  render () {
    const { error } = this.props;
    return (
      <div>
        <NavBar />
        <div className='row row--padded'>
          <p>{error}</p>
        </div>
      </div>
    );
  }
};

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorPage;
