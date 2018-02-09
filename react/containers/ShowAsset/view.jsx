import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';

import { ASSET } from 'constants/show_request_types';

function requestIsAnAssetRequest ({ requestType }) {
  return requestType === ASSET;
}

function requestIsNewRequest (nextProps, props) {
  return (nextProps.requestId !== props.requestId);
}

class ShowAsset extends React.Component {
  componentDidMount () {
    const { requestId, requestName, requestModifier, assetRequests } = this.props;
    const existingRequest = assetRequests[requestId];
    if (existingRequest) { // case: the assetRequest exists
      this.onRepeatRequest(existingRequest);
    } else { // case: the asset request does not exist
      this.onNewRequest(requestId, requestName, requestModifier);
    }
  }
  componentWillReceiveProps (nextProps) {
    // case where componentDidMount triggered new props
    if (requestIsAnAssetRequest(nextProps) && requestIsNewRequest(nextProps, this.props)) {
      const { requestId, requestName, requestModifier, assetRequests } = nextProps;
      const existingRequest = assetRequests[requestId];
      if (existingRequest) { // case: the assetRequest exists
        this.onRepeatRequest(existingRequest);
      } else { // case: the asset request does not exist
        this.onNewRequest(requestId, requestName, requestModifier);
      }
    } else {
      console.log('ShowAsset receiving new props -> request.id did not update', nextProps);
    }
  }
  onNewRequest (id, requestName, requestModifier) {
    console.log('new request');
    this.props.onNewRequest(id, requestName, requestModifier);
  }
  onRepeatRequest ({ error, name, claimId }) {
    console.log('repeat request');
    // if error, return and update state with error
    if (error) {
      return this.props.onRequestError(error);
    }
    // update the showAsset data in the store
    const { assetList } = this.props;
    const assetId = `a#${name}#${claimId}`;
    const existingAssetRecord = assetList[assetId];
    if (existingAssetRecord) { // case: the asset data already exists
      this.showExistingAsset(assetId);
    } else { // case: the asset data does not exist yet
      this.showNewAsset(name, claimId);
    }
  }
  showNewAsset (name, claimId) {
    this.props.onShowNewAsset(name, claimId);
  }
  showExistingAsset (assetId) {
    this.props.onShowExistingAsset(assetId);
  }
  componentWillUnmount () {
    this.props.onLeaveShowAsset();
  }
  render () {
    const { error, id, requestExtension } = this.props;
    if (error) {
      return (
        <ErrorPage error={error}/>
      );
    }
    if (id) { // direct requests are passing because name is present so it just goes
      if (requestExtension) {
        return (
          <ShowAssetLite />
        );
      } else {
        return (
          <ShowAssetDetails />
        );
      }
    };
    return (
      <div> </div>
    );
  }
};

export default ShowAsset;
