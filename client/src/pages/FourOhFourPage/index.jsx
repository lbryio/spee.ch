import React from 'react';
import PageLayout from '@components/PageLayout';

class FourOhForPage extends React.Component {
  render () {
    return (
      <PageLayout
        pageTitle={'404'}
        pageUri={'/404'}
        content={
          <div>
            <h2>404</h2>
            <p>That page does not exist</p>
          </div>
        }
      />
    );
  }
};

export default FourOhForPage;
