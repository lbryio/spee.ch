import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAsset from 'components/ShowAsset';
import ShowChannel from 'components/ShowChannel';
import lbryUri from 'utils/lbryUri';

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
    if (this.props.match.params !== nextProps.match.params) {
      console.log('received new params props');
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
    // handle case of identifier and claim
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
    let requestedClaim = {
      name    : claimName,
      modifier: {
        id     : null,
        channel: null,
      },
      extension,
    };
    if (isChannel) {
      requestedClaim['modifier']['channel'] = {
        name: channelName,
        id  : channelClaimId,
      };
    } else {
      requestedClaim['modifier']['id'] = claimId;
    }
    return this.props.onClaimRequest(requestedClaim);
  }
  parseAndUpdateClaimOnly (claim) {
    // handle case of just claim
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
      const requestedChannel = {
        name: channelName,
        id  : channelClaimId,
      }
      return this.props.onChannelRequest(requestedChannel);
    }
    // if not for a channel, parse the claim request
    let claimName, extension;  // if I am destructuring below, do I still need to declare these here?
    try {
      ({claimName, extension} = lbryUri.parseClaim(claim));
    } catch (error) {
      return this.setState({error: error.message});
    }
    const requestedClaim = {
      name    : claimName,
      modifier: null,
      extension,
    }
    this.props.onClaimRequest(requestedClaim);
  }
  render () {
    console.log('rendering ShowPage');
    if (this.state.error) {
      return (
        <ErrorPage error={this.state.error}/>
      );
    }
    if (this.state.claim) {
      if (this.state.claim.isChannel) {
        return (
          <ShowChannel
            channelName={this.state.claim.channelName}
            channelClaimId={this.state.claim.channelClaimId}
          />
        );
      }
      return (
        <ShowAsset
          identifier={this.state.identifier} // this.state.url.identifier
          claim={this.state.claim} // this.state.url.claim
          isServeRequest={this.state.isServeRequest} // this.state.url.ending
        />
      );
    }
    return (
      <p>Loading...</p>
    );
  }
};

// props
// channel
// show

export default ShowPage;
