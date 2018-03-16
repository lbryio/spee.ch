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
    // if a new file was chosen, update the claim name
    if (fileName !== this.props.fileName) {
      return this.setClaimName(fileName);
    }
    // if the claim has updated, check its availability
    if (claim !== this.props.claim) {
      this.validateClaim(claim);
    }
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
  validateClaim (claim) {
    if (!claim) {
      return this.props.onUrlError('Enter a url above');
    }
    request(`/api/claim/availability/${claim}`)
      .then(() => {
        this.props.onUrlError(null);
      })
      .catch((error) => {
        this.props.onUrlError(error.message);
      });
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
