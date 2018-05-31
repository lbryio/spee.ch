import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '@components/PageLayout';

class ErrorPage extends React.Component {
  render () {
    const { error } = this.props;
    return (
      <PageLayout pageTitle={'Error'} pageUri={'error'}>
        <p>{error}</p>
      </PageLayout>
    );
  }
};

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorPage;
