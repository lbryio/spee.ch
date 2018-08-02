import React from 'react';
import PageLayout from '@components/PageLayout';
import HorizontalSplit from '@components/HorizontalSplit';

class AboutPage extends React.Component {
  render () {
    return (
      <PageLayout
        pageTitle={'About'}
        pageUri={'about'}
      >
        <HorizontalSplit
          leftSide={
            <div>
              <h1>Welcome to my custom About page!</h1>
            </div>
          }
          rightSide={
            <div>
              <p>To create your own custom components that will override Spee.ch's defaults, place them in the <code>client_custom</code> folder and Spee.ch will do the rest!</p>
            </div>
          }
        />
      </PageLayout>
    );
  }
}

export default AboutPage;
