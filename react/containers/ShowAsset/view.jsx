import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';

import { ASSET } from 'constants/show_request_types';

function requestIsAnAssetRequest ({ requestType }) {
  return requestType === ASSET;
}

class ShowAsset extends React.Component {
  componentDidMount () {
    const { asset, existingRequest, requestId, requestName, requestModifier } = this.props;
    if (!existingRequest) {  // case: the asset request does not exist
      return this.props.onNewRequest(requestId, requestName, requestModifier);
    };
    if (!asset) {  // case: the asset request does not exist
      const { name, claimId } = existingRequest;
      return this.props.onShowNewAsset(name, claimId);
    };
  }
  componentWillReceiveProps (nextProps) {
    if (requestIsAnAssetRequest(nextProps)) {
      const { asset, existingRequest, requestId, requestName, requestModifier } = nextProps;
      if (!existingRequest) {
        return this.props.onNewRequest(requestId, requestName, requestModifier);
      };
      if (!asset) {
        const { name, claimId } = existingRequest;
        return this.props.onShowNewAsset(name, claimId);
      };
    }
  }
  render () {
    const {asset, requestExtension} = this.props;
    if (asset) {
      if (requestExtension) {
        return <ShowAssetLite/>;
      }
      return <ShowAssetDetails/>;
    }
    ;
    return (
      <ErrorPage error={'loading asset data...'}/>
    );
  }
};

export default ShowAsset;
