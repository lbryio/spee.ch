import React from 'react';

class SiteDescription extends React.Component {
  render () {
    return (
      <div className={'site-description'}>
        <p className={'text--extra-small'}>{this.props.siteDescription}</p>
      </div>
    );
  }
}

export default SiteDescription;
