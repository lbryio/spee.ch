import React from 'react';
import NavBar from 'containers/NavBar';
import ErrorPage from 'components/ErrorPage';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'components/AssetDisplay';
import AssetInfo from 'components/AssetInfo';

class ShowAssetDetails extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      return (
        <div>
          <NavBar/>
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
    };
    return (
      <ErrorPage error={'loading asset data...'}/>
    );
  }
};

export default ShowAssetDetails;
