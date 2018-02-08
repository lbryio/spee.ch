import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';

class ShowAsset extends React.Component {
  componentDidMount () {
    const { requestId, requestName, requestModifier, assetRequests } = this.props;
    // check to see if we have this asset
    if (assetRequests[requestId]) { // case: the assetRequest exists
      const request = assetRequests[requestId];
      this.onRepeatRequest(requestId, request);
    } else { // case: the asset request does not exist
      this.onNewRequest(requestId, requestName, requestModifier);
    }
  }
  componentWillReceiveProps (nextProps) {
    // case where componentDidMount triggered new props
    if (nextProps.assetRequests !== this.props.assetRequests) {  // note: reason for not showing small url requests?
      console.log('show.assetRequests updated');
      const { requestId, requestName, requestModifier, assetRequests } = nextProps;
      // if the component received new assetRequests, check again to see if the current request matches one
      if (assetRequests[requestId]) { // case: the assetRequest exists
        const request = assetRequests[requestId];
        this.onRepeatRequest(request);
      } else { // case: the asset request does not exist
        this.onNewRequest(requestId, requestName, requestModifier);
      }
    } else {
      console.log('show.assetRequests did not update');
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
    const { assets } = this.props;
    const assetId = `a#${name}#${claimId}`;
    if (assets[assetId]) { // case: the asset data already exists
      let { error: assetError, name, claimId, shortId, claimData } = assets[assetId];
      this.props.onShowExistingAsset(assetId, assetError, name, claimId, shortId, claimData);
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
    if (name) { // direct requests are passing because name is present so it just goes
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
