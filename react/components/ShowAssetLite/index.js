import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AssetDisplay from 'containers/AssetDisplay';

class ShowLite extends React.Component {
  render () {
    const { error, claimData: { name, claimId } } = this.props;
    return (
      <div className="row row--tall flex-container--column flex-container--center-center">
        {error &&
          <p>{error}</p>
        }
        {this.props.claimData &&
        <div>
          <AssetDisplay />
          <Link id="asset-boilerpate" className="link--primary fine-print" to={`/${claimId}/${name}`}>hosted via Spee.ch</Link>
        </div>
        }
      </div>
    );
  }
};

ShowLite.propTypes = {
  error    : PropTypes.string,
  claimData: PropTypes.object.isRequired,
};

export default ShowLite;
