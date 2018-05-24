import React from 'react';
import UrlMiddle from '@components/PublishUrlMiddleDisplay';

class PublishUrlInput extends React.Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  cleanseInput (input) {
    input = input.replace(/\s+/g, '-');
    input = input.replace(/[^A-Za-z0-9-]/g, '');
    return input;
  }
  componentDidMount () {
    const { claim, fileName } = this.props;
    if (!claim) {
      this.setInitialClaimName(fileName);
    }
  }
  componentWillReceiveProps ({ claim, fileName }) {
    // if a new file was chosen, update the claim name
    if (fileName !== this.props.fileName) {
      return this.setInitialClaimName(fileName);
    }
  }
  setInitialClaimName (fileName) {
    const fileNameWithoutEnding = fileName.substring(0, fileName.lastIndexOf('.'));
    const cleanFileName = this.cleanseInput(fileNameWithoutEnding);
    this.updateAndValidateClaimInput(cleanFileName);
  }
  handleInput (event) {
    let value = event.target.value;
    value = this.cleanseInput(value);
    this.updateAndValidateClaimInput(value);
  }
  updateAndValidateClaimInput(value) {
    if (value) {
      this.props.validateClaim(value);
    } else {
      this.props.updateError('url', 'Choose a custom url');
    }
    this.props.updateClaim(value);
  }
  render () {
    const { claim, loggedInChannelName, loggedInChannelShortId, publishInChannel, selectedChannel, urlError } = this.props;
    return (
      <div className='column column--10 column--sml-10'>
        <div className='input-text--primary span--relative'>
          <span className='url-text--secondary'>spee.ch / </span>
          <UrlMiddle
            publishInChannel={publishInChannel}
            selectedChannel={selectedChannel}
            loggedInChannelName={loggedInChannelName}
            loggedInChannelShortId={loggedInChannelShortId}
          />
          <input type='text' id='claim-name-input' className='input-text' name='claim' placeholder='your-url-here' onChange={this.handleInput} value={claim} />
          { (claim && !urlError) && <span id='input-success-claim-name' className='info-message--success span--absolute'>{'\u2713'}</span> }
          { urlError && <span id='input-success-channel-name' className='info-message--failure span--absolute'>{'\u2716'}</span> }
        </div>
        <div>
          { urlError ? (
            <p id='input-error-claim-name' className='info-message--failure'>{urlError}</p>
          ) : (
            <p className='info-message'>Choose a custom url</p>
          )}
        </div>
      </div>
    );
  }
}

export default PublishUrlInput;
