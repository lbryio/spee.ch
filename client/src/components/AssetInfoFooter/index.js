import React from 'react';
import Row from '@components/Row';

const AssetInfoFooter = ({ assetUrl, name }) => {
  return (
    <div className="asset-footer">
      <p>
        Hosted via the{' '}
        <a className={'link--primary'} href={'https://lbry.com/get'} target={'_blank'}>
          LBRY
        </a>{' '}
        blockchain
      </p>
    </div>
  );
};

export default AssetInfoFooter;
