import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAsset from 'containers/ShowAsset';
import ShowChannel from 'containers/ShowChannel';
import lbryUri from 'utils/lbryUri';

import { CHANNEL, ASSET } from 'constants/show_request_types';

class ShowPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
    this.parseUrlAndUpdateState = this.parseUrlAndUpdateState.bind(this);
    this.parseAndUpdateIdentifierAndClaim = this.parseAndUpdateIdentifierAndClaim.bind(this);
    this.parseAndUpdateClaimOnly = this.parseAndUpdateClaimOnly.bind(this);
  }
  componentDidMount () {
    console.log('ShowPage did mount');
    const identifier = this.props.match.params.identifier;
    const claim = this.props.match.params.claim;
    this.parseUrlAndUpdateState(identifier, claim);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      console.log('ShowPage received new params props');
      const identifier = nextProps.match.params.identifier;
      const claim = nextProps.match.params.claim;
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
      return this.setState({error: error.message});
    }
    // update the store
    if (isChannel) {
      return this.props.onAssetRequest(claimName, null, channelName, channelClaimId, extension);
    } else {
      return this.props.onAssetRequest(claimName, claimId, null, null, extension);
    }
  }
  parseAndUpdateClaimOnly (claim) {
    // this could be a request for an asset or a channel page
    // claim could be an asset claim or a channel claim
    let isChannel, channelName, channelClaimId;
    try {
      ({ isChannel, channelName, channelClaimId } = lbryUri.parseIdentifier(claim));
    } catch (error) {
      return this.setState({error: error.message});
    }
    // return early if this request is for a channel
    if (isChannel) {
      return this.props.onChannelRequest(channelName, channelClaimId);
    }
    // if not for a channel, parse the claim request
    let claimName, extension;  // if I am destructuring below, do I still need to declare these here?
    try {
      ({claimName, extension} = lbryUri.parseClaim(claim));
    } catch (error) {
      return this.setState({error: error.message});
    }
    this.props.onAssetRequest(claimName, null, null, null, extension);
  }
  render () {
    console.log('rendering ShowPage');
    console.log('ShowPage props', this.props);
    if (this.state.error) {
      return (
        <ErrorPage error={this.state.error}/>
      );
    }
    switch (this.props.requestType) {
      case CHANNEL:
        return <ShowChannel/>;
      case ASSET:
        return <ShowAsset/>;
      default:
        return <p>loading...</p>;
    }
  }
};

export default ShowPage;
