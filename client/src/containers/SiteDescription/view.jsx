import React from 'react';

class SiteDescription extends React.Component {
  render () {
    return (
      <p className={'text--extra-small'}>{this.props.siteDescription}</p>
    );
  }
}

export default SiteDescription;
