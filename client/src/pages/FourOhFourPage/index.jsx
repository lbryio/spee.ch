import React from 'react';
import PageLayout from '@components/PageLayout';

class FourOhForPage extends React.Component {
  render () {
    return (
      <PageLayout
        pageTitle={'404'}
        pageUri={'/404'}
      >
        <h2>404</h2>
        <p>That page does not exist</p>
      </PageLayout>
    );
  }
};

export default FourOhForPage;
