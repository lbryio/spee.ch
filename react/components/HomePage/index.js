import React from 'react';
import Helmet from 'react-helmet';
import NavBar from 'containers/NavBar';
import PublishTool from 'containers/PublishTool';

const { site: { title, host } } = require('../../../config/speechConfig.js');

class HomePage extends React.Component {
  render () {
    return (
      <div className={'row row--tall flex-container--column'}>
        <Helmet>
          <title>{title}</title>
          <link rel='canonical' href={`${host}/`} />
        </Helmet>
        <NavBar />
        <div className={'row row--tall row--padded flex-container--column'}>
          <PublishTool />
        </div>
      </div>
    );
  }
};

export default HomePage;
