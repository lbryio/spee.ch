import React from 'react';
import Helmet from 'react-helmet';
import OpenGraphTags from 'components/OpenGraphTags';
import NavBar from 'containers/NavBar';
import ErrorPage from 'components/ErrorPage';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'components/AssetDisplay';
import AssetInfo from 'components/AssetInfo';

const { site: { title, host } } = require('../../../config/speechConfig.js');

class ShowAssetDetails extends React.Component {
  render () {
    const { asset } = this.props;
    let channelName, certificateId, name, claimId;
    if (asset.claimData) {
      ({ channelName, certificateId, name, claimId } = asset.claimData);
    };
    if (asset) {
      return (
        <div>
          <Helmet>
            <title>{title} - {name} - details</title>
            {channelName ? (
              <link rel='canonical' href={`${host}/${channelName}:${certificateId}/${name}`} />
            ) : (
              <link rel='canonical' href={`${host}/${claimId}/${name}`} />
            )}
          </Helmet>
          <OpenGraphTags />
          <NavBar />
          <div className='row row--tall row--padded'>
            <div className='column column--10'>
              <AssetTitle />
            </div>
            <div className='column column--5 column--sml-10 align-content-top'>
              <div className='row row--padded'>
                <AssetDisplay />
              </div>
            </div><div className='column column--5 column--sml-10 align-content-top'>
              <div className='row row--padded'>
                <AssetInfo />
              </div>
            </div>
          </div>
          }
        </div>
      );
    };
    return (
      <ErrorPage error={'loading asset data...'} />
    );
  }
};

export default ShowAssetDetails;
