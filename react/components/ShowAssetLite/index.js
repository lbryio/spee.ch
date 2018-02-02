import React from 'react';
import { Link } from 'react-router-dom';
import AssetDisplay from 'components/AssetDisplay';

class ShowLite extends React.Component {
  render () {
    return (
      <div className="row row--tall flex-container--column flex-container--center-center">
        {this.props.error &&
          <p>{this.props.error}</p>
        }
        {this.props.claimData &&
        <div>
          <AssetDisplay
            name={this.props.claimData.name}
            claimId={this.props.claimData.claimId}
            src={`/${this.props.claimData.claimId}/${this.props.claimData.name}.${this.props.claimData.fileExt}`}
            contentType={this.props.claimData.contentType}
            fileExt={this.props.claimData.fileExt}
            thumbnail={this.props.claimData.thumbnail}
            />
          <Link id="asset-boilerpate" className="link--primary fine-print" to={`/${this.props.claimData.claimId}/${this.props.claimData.name}`}>hosted via Spee.ch</Link>
        </div>
        }
      </div>
    );
  }
};

export default ShowLite;
