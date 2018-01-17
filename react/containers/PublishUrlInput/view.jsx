import React from 'react';
import {makeGetRequest} from 'utils/xhr';
import UrlMiddle from 'components/PublishUrlMiddle';

class PublishUrlInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      host     : 'spee.ch',
      urlMiddle: null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.cleanseInput = this.cleanseInput.bind(this);
    this.setClaimNameFromFileName = this.setClaimNameFromFileName.bind(this);
    this.checkClaimIsAvailable = this.checkClaimIsAvailable.bind(this);
  }
  componentWillMount () {
    if (!this.props.claim || this.props.claim === '') {
      this.setClaimNameFromFileName();
    }
  }
  componentWillReceiveProps ({claim: newClaim}) {
    if (newClaim) {
      this.checkClaimIsAvailable(newClaim);
    } else {
      this.props.onUrlError('Please enter a URL');
    }
  }
  handleInput (event) {
    event.preventDefault();
    let value = event.target.value;
    value = this.cleanseInput(value);
    // update the state
    this.props.onClaimChange(value);
  }
  cleanseInput (input) {
    input = input.replace(/\s+/g, '-'); // replace spaces with dashes
    input = input.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
    return input;
  }
  setClaimNameFromFileName () {
    const fileName = this.props.fileName;
    const fileNameWithoutEnding = fileName.substring(0, fileName.lastIndexOf('.'));
    const cleanClaimName = this.cleanseInput(fileNameWithoutEnding);
    this.props.onClaimChange(cleanClaimName);
  }
  checkClaimIsAvailable (claim) {
    const that = this;
    makeGetRequest(`/api/claim-is-available/${claim}`)
      .then(response => {
        if (response) {
          that.props.onUrlError(null);
        } else {
          that.props.onUrlError('That url has already been claimed');
        }
      })
      .catch((error) => {
        that.props.onUrlError(error.message);
      });
  }
  render () {
    return (
      <div>
        <p id="input-error-claim-name" className="info-message-placeholder info-message--failure">{this.props.urlError}</p>
        <div className="column column--3 column--sml-10">
          <label className="label">URL:</label>
        </div><div className="column column--7 column--sml-10 input-text--primary span--relative">

          <span className="url-text--secondary">{this.state.host} / </span>

          <UrlMiddle publishInChannel={this.props.publishInChannel} loggedInChannelName={this.props.loggedInChannelName} loggedInChannelShortId={this.props.loggedInChannelShortId}/>

          <input type="text" id="claim-name-input" className="input-text" name='claim' placeholder="your-url-here" onChange={this.handleInput} value={this.props.claim}/>
          { (this.props.claim && !this.props.urlError) && <span id="input-success-claim-name" className="info-message--success span--absolute">{'\u2713'}</span> }
        </div>
      </div>
    );
  }
}

export default PublishUrlInput;
