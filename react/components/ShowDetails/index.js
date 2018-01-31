import React from 'react';
import NavBar from 'containers/NavBar';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'components/AssetDisplay';
import AssetInfo from 'components/AssetInfo';

class ShowDetails extends React.Component {
  componentDidMount () {
    console.log(this.props);
  }
  render () {
    return (
      <div>
        <NavBar/>
          {this.props.error &&
          <p>{this.props.error}</p>
          }
          {this.props.claimData &&
          <div className="row row--tall row--padded">
            <div className="column column--10">
              <AssetTitle title={this.props.claimData.title}/>
            </div>
            <div className="column column--5 column--sml-10 align-content-top">
              <div className="row row--padded">
                <AssetDisplay
                claimName={this.props.claimData.name}
                claimId={this.props.claimData.claimId}
                />
              </div>
            </div><div className="column column--5 column--sml-10 align-content-top">
              <div className="row row--padded">
              <AssetInfo claimId={this.props.claimData.claimId}/>
              </div>
            </div>
          </div>
          }
        </div>
    );
  }
};

// required props
// isChannel
// channelName
// channelClaimId
// claimId
// claimName

export default ShowDetails;
