import React from 'react';
import { Link } from 'react-router-dom';
import AssetDisplay from 'components/AssetDisplay';

class ShowLite extends React.Component {
  render () {
    const { asset } = this.props;
    return (
      <div className="row row--tall flex-container--column flex-container--center-center">
        { (asset) &&
        <div>
          <AssetDisplay />
          <Link id="asset-boilerpate" className="link--primary fine-print" to={`/${asset.claimId}/${asset.name}`}>hosted via Spee.ch</Link>
        </div>
        }
      </div>
    );
  }
};

export default ShowLite;
