import React from 'react';
import PropTypes from 'prop-types';
import NavBar from 'containers/NavBar';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'components/AssetDisplay';
import AssetInfo from 'components/AssetInfo';

class ShowAssetDetails extends React.Component {
  componentDidMount () {
    console.log('ShowAssetDetails props', this.props);
  }
  render () {
    return (
      <div>
        <NavBar/>
          {this.props.error &&
          <div className="row row--padded">
            <p>{this.props.error}</p>
          </div>
          }
          {this.props.claimData &&
          <div className="row row--tall row--padded">
            <div className="column column--10">
              <AssetTitle title={this.props.claimData.title}/>
            </div>
            <div className="column column--5 column--sml-10 align-content-top">
              <div className="row row--padded">
                <AssetDisplay
                name={this.props.claimData.name}
                claimId={this.props.claimData.claimId}
                src={`/${this.props.claimData.claimId}/${this.props.claimData.name}.${this.props.claimData.fileExt}`}
                contentType={this.props.claimData.contentType}
                fileExt={this.props.claimData.fileExt}
                thumbnail={this.props.claimData.thumbnail}
                />
              </div>
            </div><div className="column column--5 column--sml-10 align-content-top">
              <div className="row row--padded">
              <AssetInfo
                channelName={this.props.claimData.channelName}
                certificateId={this.props.claimData.certificateId}
                description={this.props.claimData.description}
                name={this.props.claimData.name}
                claimId={this.props.claimData.claimId}
                fileExt={this.props.claimData.fileExt}
                contentType={this.props.claimData.contentType}
                thumbnail={this.props.claimData.thumbnail}
                host={this.props.claimData.host}
                shortClaimId={this.props.shortId}
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
