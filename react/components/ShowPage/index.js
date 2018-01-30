import React from 'react';
import ShowLite from 'components/ShowLite';
import ShowDetails from 'components/ShowDetails';
import ShowChannel from 'components/ShowChannel';
import lbryUri from 'utils/lbryUri';

class ShowPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isChannel     : null,
      channelName   : null,
      channelClaimId: null,
      claimId       : null,
      claimName     : null,
      isServeRequest: null,
    };
  }
  componentDidMount () {
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
        isChannel,
        channelName,
        channelClaimId,
        claimId,
        claimName,
        isServeRequest,
      });
    }
    // handle case of just claim (asset or channel)
    let isChannel, channelName, channelClaimId;
    try {
      ({ isChannel, channelName, channelClaimId } = lbryUri.parseIdentifier(claim));
    } catch (error) {
      console.log('error:', error);
    }
    if (isChannel) {
      return this.setState({
        isChannel,
        channelName,
        channelClaimId,
      });
    }
    let claimName, isServeRequest;
    try {
      ({claimName, isServeRequest} = lbryUri.parseName(claim));
    } catch (error) {
      console.log('error:', error);
    }
    this.setState({
      claimName,
      isServeRequest,
    });
  }
  render () {
    const identifier = this.props.match.params.identifier;
    console.log('rendering component');
    if (!identifier && this.state.isChannel) {
      return (
        <ShowChannel
          channelName={this.state.channelName}
          channelClaimId={this.state.channelClaimId}
        />
      );
    }
    if (this.state.isServeRequest) {
      return (
        <ShowLite
          claimId={this.state.claimId}
          claimName={this.state.claimName}
        />
      );
    }
    return (
      <ShowDetails
        claimId={this.state.claimId}
        claimName={this.state.claimName}
      />
    );
  }
};

export default ShowPage;
