import React from 'react';
import ShowAsset from 'components/ShowAsset';
import ShowChannel from 'components/ShowChannel';
import lbryUri from 'utils/lbryUri';

class ShowPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      identifier    : null,
      claim         : null,
      isServeRequest: null,
    };
  }
  componentDidMount () {
    console.log('ShowPage did mount');
    const identifier = this.props.match.params.identifier;
    const claim = this.props.match.params.claim;
    // handle case of identifier and claim
    if (identifier) {
      let isChannel, channelName, channelClaimId, claimId, claimName, isServeRequest;
      try {
        ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(identifier));
        ({ claimName, isServeRequest } = lbryUri.parseName(claim));
      } catch (error) {
        return console.log('error:', error);
      }
      // set state
      return this.setState({
        identifier: {
          isChannel,
          channelName,
          channelClaimId,
          claimId,
        },
        claim: {
          claimName,
        },
        isServeRequest,
      });
    }
    // handle case of just claim (asset or channel)
    let isChannel, channelName, channelClaimId;
    try {
      ({ isChannel, channelName, channelClaimId } = lbryUri.parseIdentifier(claim));
    } catch (error) {
      return console.log('error:', error);
    }
    if (isChannel) {
      return this.setState({
        claim: {
          isChannel,
          channelName,
          channelClaimId,
        },
      });
    }
    let claimName, isServeRequest;
    try {
      ({claimName, isServeRequest} = lbryUri.parseName(claim));
    } catch (error) {
      return console.log('error:', error);
    }
    this.setState({
      claim: {
        claimName,
      },
      isServeRequest,
    });
  }
  render () {
    console.log('rendering ShowPage');
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

export default ShowPage;
