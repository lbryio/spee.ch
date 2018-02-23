import React from 'react';
import Helmet from 'react-helmet';
import OpenGraphTags from 'components/OpenGraphTags';
import { Link } from 'react-router-dom';
import AssetDisplay from 'components/AssetDisplay';

const { site: { title, host } } = require('../../../config/speechConfig.js');

class ShowLite extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      let channelName, certificateId, name, claimId, fileExt;
      if (asset.claimData) {
        ({ channelName, certificateId, name, claimId, fileExt } = asset.claimData);
      };
      return (
        <div className='row row--tall flex-container--column flex-container--center-center'>
          <Helmet>
            <title>{title} - {name}</title>
            {channelName ? (
              <link rel='canonical' href={`${host}/${channelName}:${certificateId}/${name}.${fileExt}`} />
            ) : (
              <link rel='canonical' href={`${host}/${claimId}/${name}.${fileExt}`} />
            )}
            <OpenGraphTags />
          </Helmet>
          <div>
            <AssetDisplay />
            <Link id='asset-boilerpate' className='link--primary fine-print' to={`/${claimId}/${name}`}>hosted
              via Spee.ch</Link>
          </div>
        </div>
      );
    }
    return (
      <p>loading asset data...</p>
    );
  }
};

export default ShowLite;
