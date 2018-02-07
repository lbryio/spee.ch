import React from 'react';
import PropTypes from 'prop-types';
import NavBar from 'containers/NavBar';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'containers/AssetDisplay';
import AssetInfo from 'components/AssetInfo';

class ShowAssetDetails extends React.Component {
  render () {
    const { error, claimData: { title, channelName, certificateId, description, name, claimId, fileExt, contentType, thumbnail, host }, shortId } = this.props;
    return (
      <div>
        <NavBar/>
          {error &&
          <div className="row row--padded">
            <p>{error}</p>
          </div>
          }
          {this.props.claimData &&
          <div className="row row--tall row--padded">
            <div className="column column--10">
              <AssetTitle title={title}/>
            </div>
            <div className="column column--5 column--sml-10 align-content-top">
              <div className="row row--padded">
                <AssetDisplay />
              </div>
            </div><div className="column column--5 column--sml-10 align-content-top">
              <div className="row row--padded">
              <AssetInfo
                channelName={channelName}
                certificateId={certificateId}
                description={description}
                name={name}
                claimId={claimId}
                fileExt={fileExt}
                contentType={contentType}
                thumbnail={thumbnail}
                host={host}
                shortId={shortId}
              />
              </div>
            </div>
          </div>
          }
        </div>
    );
  }
};

ShowAssetDetails.propTypes = {
  error    : PropTypes.string,
  claimData: PropTypes.object.isRequired,
  shortId  : PropTypes.string.isRequired,
};

export default ShowAssetDetails;
