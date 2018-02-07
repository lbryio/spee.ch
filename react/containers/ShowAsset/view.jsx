import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';
import request from 'utils/request';

function buildIdFromModifierObject (modifier) {
  if (modifier) {
    if (modifier.channel.name) {
      return `${modifier.channel.name}#${modifier.channel.id}`;
    }
    return modifier.id;
  }
  return '';
}

class ShowAsset extends React.Component {
  constructor (props) {
    super(props);
    this.getLongClaimId = this.getLongClaimId.bind(this);
    this.getClaimData = this.getClaimData.bind(this);
  }
  componentDidMount () {
    const { request: { name, modifier }, assetRequests } = this.props;
    const id = buildIdFromModifierObject(modifier);
    // check to see if we have this asset
    if (assetRequests[id]) {
      // case: the assetRequest exists
      this.props.onNewAssetRequest(id, name, modifier);  // request the long id and update the store with a new asset request record.
    } else {
      // case: the asset request does not exist
      this.onRepeatAssetRequest(name, modifier); // get the asset request record...?
    }
  }
  onRepeatAssetRequest (id, modifier, assetRequests) {
    // get the results of the existing asset request
    const {error, claimId} = assetRequests[id];
    console.log(`results form past request ${id}:`, error, claimId);
  }
  componentWillUnmount () {
    this.props.onAssetClaimDataClear();
  }
  render () {
    const { error, claimData, extension } = this.props;
    if (error) {
      return (
        <ErrorPage error={error}/>
      );
    }
    if (claimData) {
      if (extension) {
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
