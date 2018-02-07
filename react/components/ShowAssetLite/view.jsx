import React from 'react';
import { Link } from 'react-router-dom';
import AssetDisplay from 'components/AssetDisplay';

class ShowLite extends React.Component {
  render () {
    const { name, claimId } = this.props;
    return (
      <div className="row row--tall flex-container--column flex-container--center-center">
        { (name && claimId) &&
        <div>
          <AssetDisplay />
          <Link id="asset-boilerpate" className="link--primary fine-print" to={`/${claimId}/${name}`}>hosted via Spee.ch</Link>
        </div>
        }
      </div>
    );
  }
};

export default ShowLite;
