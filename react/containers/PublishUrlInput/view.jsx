import React from 'react';
import request from 'utils/request';
import UrlMiddle from 'components/PublishUrlMiddleDisplay';

class PublishUrlInput extends React.Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount () {
    const { claim, fileName } = this.props;
    if (!claim) {
      this.setClaimName(fileName);
    }
  }
  componentWillReceiveProps ({ claim, fileName }) {
    if (!claim) {
      return this.setClaimName(fileName);
    }
    this.checkClaimIsAvailable(claim);
  }
  handleInput (event) {
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
  setClaimName (fileName) {
    const fileNameWithoutEnding = fileName.substring(0, fileName.lastIndexOf('.'));
    const cleanClaimName = this.cleanseInput(fileNameWithoutEnding);
    this.props.onClaimChange(cleanClaimName);
  }
  checkClaimIsAvailable (claim) {
    request(`/api/claim/availability/${claim}`)
      .then(isAvailable => {
        console.log('checkClaimIsAvailable request response:', isAvailable);
        if (isAvailable) {
          this.props.onUrlError(null);
        } else {
          this.props.onUrlError('That url has already been claimed');
        }
      })
      .catch((error) => {
        this.props.onUrlError(error.message);
      });
  }
  render () {
    return (
      <div>
        <p id='input-error-claim-name' className='info-message-placeholder info-message--failure'>{this.props.urlError}</p>
        <div className='column column--3 column--sml-10'>
          <label className='label'>URL:</label>
        </div><div className='column column--7 column--sml-10 input-text--primary span--relative'>

          <span className='url-text--secondary'>spee.ch / </span>

          <UrlMiddle
            publishInChannel={this.props.publishInChannel}
            selectedChannel={this.props.selectedChannel}
            loggedInChannelName={this.props.loggedInChannelName}
            loggedInChannelShortId={this.props.loggedInChannelShortId}
          />

          <input type='text' id='claim-name-input' className='input-text' name='claim' placeholder='your-url-here' onChange={this.handleInput} value={this.props.claim} />
          { (this.props.claim && !this.props.urlError) && <span id='input-success-claim-name' className='info-message--success span--absolute'>{'\u2713'}</span> }
          { this.props.urlError && <span id='input-success-channel-name' className='info-message--failure span--absolute'>{'\u2716'}</span> }
        </div>
      </div>
    );
  }
}

export default PublishUrlInput;
