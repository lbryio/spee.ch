import React from 'react';

class SiteDescription extends React.Component {
  render () {
    return (
      <p className='extra-small'>
        {this.props.siteDescription}
      </p>
    );
  }
}

export default SiteDescription;
