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
              claimName={this.props.claimData.name}
              claimId={this.props.claimData.claimId}
            />
          <Link id="asset-boilerpate" className="link--primary fine-print" to={`/${this.props.claimData.claimId}/${this.props.claimData.name}`}>hosted via Spee.ch</Link>
        </div>
        }
      </div>
    );
  }
};

export default ShowLite;
