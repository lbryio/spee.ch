import React from 'react';
import PropTypes from 'prop-types';
import NavBar from 'containers/NavBar';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'components/AssetDisplay';
import AssetInfo from 'components/AssetInfo';

class ShowAssetDetails extends React.Component {
  render () {
    const { claimData } = this.props;
    return (
      <div>
        <NavBar/>
        {claimData &&
        <div className="row row--tall row--padded">
          <div className="column column--10">
            <AssetTitle />
          </div>
          <div className="column column--5 column--sml-10 align-content-top">
            <div className="row row--padded">
              <AssetDisplay />
            </div>
          </div><div className="column column--5 column--sml-10 align-content-top">
          <div className="row row--padded">
            <AssetInfo />
          </div>
        </div>
        </div>
        }
      </div>
    );
  }
};

ShowAssetDetails.propTypes = {
  error: PropTypes.string,
};

export default ShowAssetDetails;
