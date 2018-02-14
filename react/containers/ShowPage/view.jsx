import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';
import ShowChannel from 'components/ShowChannel';
import lbryUri from 'utils/lbryUri';

import { CHANNEL, ASSET_LITE, ASSET_DETAILS } from 'constants/show_request_types';

class ShowPage extends React.Component {
  constructor (props) {
    super(props);
    this.parseUrlAndUpdateState = this.parseUrlAndUpdateState.bind(this);
    this.parseAndUpdateIdentifierAndClaim = this.parseAndUpdateIdentifierAndClaim.bind(this);
    this.parseAndUpdateClaimOnly = this.parseAndUpdateClaimOnly.bind(this);
  }
  componentDidMount () {
    const { identifier, claim } = this.props.match.params;
    this.parseUrlAndUpdateState(identifier, claim);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      const { identifier, claim } = nextProps.match.params;
      this.parseUrlAndUpdateState(identifier, claim);
    }
  }
  parseUrlAndUpdateState (identifier, claim) {
    if (identifier) {
      return this.parseAndUpdateIdentifierAndClaim(identifier, claim);
    }
    this.parseAndUpdateClaimOnly(claim);
  }
  parseAndUpdateIdentifierAndClaim (modifier, claim) {
    // this is a request for an asset
    // claim will be an asset claim
    // the identifier could be a channel or a claim id
    let isChannel, channelName, channelClaimId, claimId, claimName, extension;
    try {
      ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(modifier));
      ({ claimName, extension } = lbryUri.parseClaim(claim));
    } catch (error) {
      return this.props.onRequestError(error.message);
    }
    // update the store
    if (isChannel) {
      return this.props.onNewAssetRequest(claimName, null, channelName, channelClaimId, extension);
    } else {
      return this.props.onNewAssetRequest(claimName, claimId, null, null, extension);
    }
  }
  parseAndUpdateClaimOnly (claim) {
    // this could be a request for an asset or a channel page
    // claim could be an asset claim or a channel claim
    let isChannel, channelName, channelClaimId;
    try {
      ({ isChannel, channelName, channelClaimId } = lbryUri.parseIdentifier(claim));
    } catch (error) {
      return this.props.onRequestError(error.message);
    }
    // return early if this request is for a channel
    if (isChannel) {
      return this.props.onNewChannelRequest(channelName, channelClaimId);
    }
    // if not for a channel, parse the claim request
    let claimName, extension;  // if I am destructuring below, do I still need to declare these here?
    try {
      ({claimName, extension} = lbryUri.parseClaim(claim));
    } catch (error) {
      return this.props.onRequestError(error.message);
    }
    this.props.onNewAssetRequest(claimName, null, null, null, extension);
  }
  render () {
    const { error, requestType } = this.props;
    if (error) {
      return (
        <ErrorPage error={error}/>
      );
    }
    switch (requestType) {
      case CHANNEL:
        return <ShowChannel />;
      case ASSET_LITE:
        return <ShowAssetLite />;
      case ASSET_DETAILS:
        return <ShowAssetDetails />;
      default:
        return <p>loading...</p>;
    }
  }
};

export default ShowPage;
