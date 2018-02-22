import React from 'react';
import NavBar from 'containers/NavBar';
import PublishTool from 'containers/PublishTool';

class PublishPage extends React.Component {
  render () {
    return (
      <div className={'row row--tall flex-container--column'}>
        <NavBar />
        <div className={'row row--tall row--padded flex-container--column'}>
          <PublishTool />
        </div>
      </div>
    );
  }
};

export default PublishPage;
