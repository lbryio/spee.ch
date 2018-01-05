import React from 'react';

function UrlMiddle ({publishToChannel, loggedInChannelName, loggedInChannelShortId}) {
  if (publishToChannel) {
    if (loggedInChannelName) {
      return <span id="url-channel" className="url-text--secondary">{loggedInChannelName}:{loggedInChannelShortId} /</span>;
    }
    return <span id="url-channel-placeholder" className="url-text--secondary tooltip">@channel<span
          className="tooltip-text">Select a channel below</span> /</span>;
  }
  return (
    <span id="url-no-channel-placeholder" className="url-text--secondary tooltip">xyz<span className="tooltip-text">This will be a random id</span> /</span>
  );
}

class UrlChooser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      urlError    : null,
      urlBeginning: 'spee.ch',
      urlMiddle   : null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.checkClaimIsAvailable = this.checkClaimIsAvailable.bind(this);
  }
  handleInput (event) {
    event.preventDefault();
    let value = event.target.value;
    const name = event.target.name;
    value = this.props.cleanseClaimName(value);
    this.props.updateUploaderState(name, value);
    this.checkClaimIsAvailable(value);
  }
  checkClaimIsAvailable (claim) {
    const that = this;
    this.props.makeGetRequest(`/api/claim-is-available/${claim}`)
      .then(() => {
        that.setState({urlError: null});
      })
      .catch((error) => {
        that.setState({urlError: error.message});
      });
  }
  render () {
    return (
      <div>
        <div className="row row--padded row--no-top row--wide">

          <p id="input-error-claim-name" className="info-message-placeholder info-message--failure">{this.state.urlError}</p>

          <div className="column column--3 column--sml-10">
            <label className="label">URL:</label>
          </div><div className="column column--7 column--sml-10 input-text--primary span--relative">

            <span className="url-text--secondary">{this.state.urlBeginning} / </span>

            <UrlMiddle publishToChannel={this.props.publishToChannel} loggedInChannelName={this.props.loggedInChannelName} loggedInChannelShortId={this.props.loggedInChannelShortId}/>

            <input type="text" id="claim-name-input" className="input-text" name='claim' placeholder="your-url-here" onChange={this.handleInput} value={this.props.claim}/>
            { (this.props.claim && !this.state.urlError) && (
              <span id="input-success-claim-name" className="info-message--success span--absolute">{'\u2713'}</span>
            )}

          </div>

        </div>
      </div>
    );
  }
}

module.exports = UrlChooser;
