import React from 'react';

class SiteDescription extends React.Component {
  render () {
    return (
      <div className='site-description'>
        {this.props.siteDescription}
      </div>
    );
  }
}

export default SiteDescription;
