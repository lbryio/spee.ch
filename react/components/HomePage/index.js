import React from 'react';
import SEO from 'components/SEO';
import NavBar from 'containers/NavBar';
import PublishTool from 'containers/PublishTool';

class HomePage extends React.Component {
  render () {
    return (
      <div className={'row row--tall flex-container--column'}>
        <SEO />
        <NavBar />
        <div className={'row row--tall row--padded flex-container--column'}>
          <PublishTool />
        </div>
      </div>
    );
  }
};

export default HomePage;
