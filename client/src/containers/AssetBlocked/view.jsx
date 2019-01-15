import React from 'react';
import createCanonicalLink from '@globalutils/createCanonicalLink';
import HorizontalSplit from '@components/HorizontalSplit';

class BlockedLeft extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <img className='asset-image' src={'https://upload.wikimedia.org/wikipedia/commons/archive/a/af/20120315000030%21OR_451.svg'} alt={'451 image'} />
      </React.Fragment>
    );
  }
}

class BlockedRight extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <p>In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content.</p>
        <p><a href={'https://lbry.io/faq/dmca'} >Click here</a> for more information.</p>
      </React.Fragment>
    );
  }
}

class AssetBlocked extends React.Component {
  componentDidMount () {
    /*
    This function and fetch exists to send the browser the appropriate 451 error.
     */
    const { asset } = this.props;
    const { claimData: { contentType, outpoint } } = asset;
    let fileExt;
    if (typeof contentType === 'string') {
      fileExt = contentType.split('/')[1] || 'jpg';
    }
    const sourceUrl = `${createCanonicalLink({ asset: asset.claimData })}.${fileExt}?${outpoint}`;
    fetch(sourceUrl)
      .catch();
  }

  render () {
    return (
      <div>
        <HorizontalSplit
          collapseOnMobile
          leftSide={<BlockedLeft />}
          rightSide={<BlockedRight />}
        />
      </div>
    );
  }
}

export default AssetBlocked;
