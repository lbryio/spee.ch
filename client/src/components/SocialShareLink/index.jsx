import React from 'react';

class SocialShareLink extends React.Component {
  render () {
    return (
      <div className={'space-between social-share-link'}>
        {this.props.children}
      </div>
    );
  }
}

export default SocialShareLink;
