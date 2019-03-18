import React from 'react';
import { Link } from 'react-router-dom';
import PageLayoutShowLite from '@components/PageLayoutShowLite';
import AssetDisplay from '@containers/AssetDisplay';
import SpaceAround from '@components/SpaceAround';
import VerticalSplit from '@components/VerticalSplit';

const AssetLiteFooter = ({ name, claimId }) => {
  return (
    <SpaceAround>
      <p className={'text--extra-small'}>
        <Link className='link--primary' to={`/${claimId}/${name}`}> hosted on spee.ch</Link> via the <a  className='link--primary' href={'https://lbry.com/get'} target={'_blank'}>LBRY</a> blockchain
      </p>
    </SpaceAround>
  );
};

class ShowLite extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { name, claimId } = asset.claimData;
      return (
        <PageLayoutShowLite
          pageTitle={name}
          asset={asset}
        >
          <VerticalSplit
            top={<AssetDisplay />}
            bottom={
              <AssetLiteFooter
                name={name}
                claimId={claimId}
              />
            }
          />
        </PageLayoutShowLite>
      );
    }
    return (
      <div>
        <p className={'text--secondary'}>loading asset data...</p>
      </div>
    );
  }
}

export default ShowLite;
