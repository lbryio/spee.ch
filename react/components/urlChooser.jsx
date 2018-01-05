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

class UrlInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      urlError    : null,
      urlBeginning: 'spee.ch',
      urlMiddle   : null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.validateClaimName = this.validateClaimName.bind(this);
    this.cleanseClaimName = this.cleanseClaimName.bind(this);
    this.checkClaimIsValidAndAvailable = this.checkClaimIsValidAndAvailable.bind(this);
  }
  handleInput (event) {
    event.preventDefault();
    let value = event.target.value;
    const name = event.target.name;
    value = this.cleanseClaimName(value);
    this.props.updateUploaderState(name, value);
    this.checkClaimIsValidAndAvailable(value);
  }
  validateClaimName (claim) {
    // ensure a name was entered
    if (!claim || claim.length < 1) {
      throw new Error('You must enter a name for your url');
    }
    // validate the characters in the 'name' field
    const invalidCharacters = /[^A-Za-z0-9,-]/g.exec(claim);
    if (invalidCharacters) {
      throw new Error('"' + invalidCharacters + '" characters are not allowed');
    }
    return claim;
  }
  cleanseClaimName (name) {
    name = name.replace(/\s+/g, '-'); // replace spaces with dashes
    name = name.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
    return name;
  }
  checkClaimIsValidAndAvailable (claim) {
    // validationFunctions.checkClaimName(event.target.value)
    try {
      claim = this.validateClaimName(claim);
    } catch (error) {
      this.setState({urlError: error.message});
      return;
    }
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

            <input type="text" id="claim-name-input" className="input-text" name='claim' placeholder="your-url-here" onInput={this.handleInput} value={this.props.claim}/>
            { (this.props.claim && !this.state.urlError) && (
              <span id="input-success-claim-name" className="info-message--success span--absolute">{'\u2713'}</span>
            )}

          </div>

        </div>
      </div>
    );
  }
}

module.exports = UrlInput;
