import React from 'react';
import createCanonicalLink from '@globalutils/createCanonicalLink';
import HorizontalSplit from '@components/HorizontalSplit';

class BlockedLeft extends React.PureComponent {
  render () {
    return (
      <div>
        <img className={'asset-blocked__image'} src={'/assets/img/451sign.svg'} alt={'451 image'} />
      </div>
    );
  }
}

class BlockedRight extends React.PureComponent {
  render () {
    return (
      <div className={'asset-blocked__text'} >
        <p>In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications.</p>
        <p><a href={'https://lbry.com/faq/dmca'} >Click here</a> for more information.</p>
      </div>
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
