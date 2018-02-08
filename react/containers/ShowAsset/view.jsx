import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';

function buildIdFromModifierObject (name, modifier) {
  if (modifier) {
    if (modifier.channel.name) {
      return `${name}#${modifier.channel.name}#${modifier.channel.id}`;
    }
    return `${name}#${modifier.id}`;
  }
  return `${name}`;
}

function buildIdFromNameAndClaimId (name, claimId) {
  return `${name}#${claimId}`;
}

class ShowAsset extends React.Component {
  componentDidMount () {
    const { requestName, requestModifier, assetRequests } = this.props;
    const id = buildIdFromModifierObject(requestName, requestModifier);
    // check to see if we have this asset
    if (assetRequests[id]) { // case: the assetRequest exists
      const request = assetRequests[id];
      this.onRepeatRequest(id, request);
    } else { // case: the asset request does not exist
      this.onNewRequest(id, requestName, requestModifier);
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.assetRequests !== this.props.assetRequests) {
      console.log('assetRequests updated:');
      const { requestName, requestModifier, assetRequests } = nextProps;
      const id = buildIdFromModifierObject(requestName, requestModifier);
      // if the component received new assetRequests, check again to see if the current request matches one
      if (assetRequests[id]) { // case: the assetRequest exists
        const request = assetRequests[id];
        this.onRepeatRequest(id, request);
      } else { // case: the asset request does not exist
        this.onNewRequest(id, requestName, requestModifier);
      }
    }
  }
  onNewRequest (id, requestName, requestModifier) {
    console.log('new request');
    this.props.onNewRequest(id, requestName, requestModifier);
  }
  onRepeatRequest (requestId, request) {
    console.log('repeat request');
    const { assets } = this.props;
    const { error: requestError, name, claimId } = request;
    const assetId = buildIdFromNameAndClaimId(name, claimId);
    // if error, return and update state with error
    if (requestError) {
      return this.props.onRequestError(requestError);
    }
    // update the show asset data in the store
    if (assets[assetId]) { // case: the asset data already exists
      let { error, name, claimId, shortId, claimData } = assets[assetId];
      this.props.onShowExistingAsset(assetId, error, name, claimId, shortId, claimData);
    } else { // case: the asset data does not exist yet
      this.props.onShowNewAsset(assetId, name, claimId);
    }
  }
  componentWillUnmount () {
    this.props.onLeaveShowAsset();
  }
  render () {
    const { error, name, requestExtension } = this.props;
    if (error) {
      return (
        <ErrorPage error={error}/>
      );
    }
    if (name) {
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
