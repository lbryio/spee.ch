import React from 'react';
import PageLayout from '@components/PageLayout';
import * as Icon from 'react-feather';
import AssetDisplay from '@containers/AssetDisplay';
import AssetBlocked from '@containers/AssetBlocked';
import AssetInfo from '@containers/AssetInfo';
import ErrorPage from '@pages/ErrorPage';
import AssetTitle from '@containers/AssetTitle';

class ShowAssetDetails extends React.Component {

  constructor (props) {
    super(props);
    this.toggleExpandDetails = this.toggleExpandDetails.bind(this);
  }

  toggleExpandDetails () {
    this.props.onToggleDetailsExpanded(!this.props.detailsExpanded);
  }

  render () {
    const { asset, detailsExpanded } = this.props;
    if (asset) {
      const { claimData: { name, blocked } } = asset;
      if (!blocked) {
        return (
          <PageLayout
            pageTitle={`${name} - details`}
            asset={asset}
          >
            <div className='asset-main'>
              <AssetTitle />
              <AssetDisplay />
              <div>
                <button className='collapse-button' onClick={this.toggleExpandDetails}>
                  {detailsExpanded ? <Icon.MinusCircle /> : <Icon.PlusCircle className='plus-icon' /> }
                </button>
              </div>
            </div>
            {detailsExpanded && <AssetInfo />}

          </PageLayout>
        );
      } else {
        return (
          <PageLayout>
            <div className="asset-main">
              <AssetBlocked />
            </div>
          </PageLayout>
        );
      }
    }
    return (
      <ErrorPage error={'loading asset data...'} />
    );
  }
};

export default ShowAssetDetails;
