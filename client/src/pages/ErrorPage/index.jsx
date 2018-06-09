import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '@components/PageLayout';

class ErrorPage extends React.Component {
  render () {
    const { error } = this.props;
    return (
      <PageLayout
        pageTitle={'Error'}
        pageUri={'error'}
        content={
          <p>{error}</p>
        }
      />
    );
  }
};

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorPage;
