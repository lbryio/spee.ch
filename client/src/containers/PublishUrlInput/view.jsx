import React from 'react';
import UrlMiddle from '@components/PublishUrlMiddleDisplay';
import FormFeedbackDisplay from '@components/FormFeedbackDisplay';

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
      <div>
        <div className={'publish-url-input'}>
          <div className={'align-left'}>
            <span className='publish-url-text'>spee.ch&nbsp;/&nbsp;</span>
          </div>
          <div className={'shrink'}>
            <UrlMiddle
              publishInChannel={publishInChannel}
              selectedChannel={selectedChannel}
              loggedInChannelName={loggedInChannelName}
              loggedInChannelShortId={loggedInChannelShortId}
            />
          </div>
          <div className={'fill'}>
            <input
              type='text'
              className='input-text input-text--full-width'
              name='claim'
              placeholder='your-url-here'
              onChange={this.handleInput}
              value={claim}
            />
          </div>
        </div>
        <FormFeedbackDisplay
          errorMessage={urlError}
          defaultMessage={'Choose a custom url'}
        />
      </div>
    );
  }
}

export default PublishUrlInput;
