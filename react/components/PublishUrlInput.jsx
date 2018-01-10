import React from 'react';
import { updateClaim } from '../actions';
import { connect } from 'react-redux';
import { makeGetRequest } from '../utils/xhr.js';
import UrlMiddle from './UrlMiddle.jsx';

class UrlChooser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error    : null,
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
  handleInput (event) {
    event.preventDefault();
    let value = event.target.value;
    value = this.cleanseInput(value);
    // update the state
    this.props.onClaimChange(value);
    // check to make sure claim name is available
    this.checkClaimIsAvailable(value);
  }
  cleanseInput (input) {
    input = input.replace(/\s+/g, '-'); // replace spaces with dashes
    input = input.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
    return input;
  }
  setClaimNameFromFileName () {
    const fileName = this.props.fileName;
    console.log('setClaimNameFromFileName', fileName);
    const fileNameWithoutEnding = fileName.substring(0, fileName.lastIndexOf('.'));
    const cleanClaimName = this.cleanseInput(fileNameWithoutEnding);
    this.props.onClaimChange(cleanClaimName);
  }
  checkClaimIsAvailable (claim) {
    const that = this;
    makeGetRequest(`/api/claim-is-available/${claim}`)
      .then(() => {
        that.setState({'error': null});
      })
      .catch((error) => {
        that.setState({'error': error.message});
      });
  }
  render () {
    return (
      <div>
        <p id="input-error-claim-name" className="info-message-placeholder info-message--failure">{this.state.error}</p>
        <div className="column column--3 column--sml-10">
          <label className="label">URL:</label>
        </div><div className="column column--7 column--sml-10 input-text--primary span--relative">

          <span className="url-text--secondary">{this.state.host} / </span>

          <UrlMiddle publishInChannel={this.props.publishInChannel} loggedInChannelName={this.props.loggedInChannelName} loggedInChannelShortId={this.props.loggedInChannelShortId}/>

          <input type="text" id="claim-name-input" className="input-text" name='claim' placeholder="your-url-here" onChange={this.handleInput} value={this.props.claim}/>
          { (this.props.claim && !this.state.error) && <span id="input-success-claim-name" className="info-message--success span--absolute">{'\u2713'}</span> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fileName              : state.file.name,
    loggedInChannelName   : state.loggedInChannel.name,
    loggedInChannelShortId: state.loggedInChannel.shortId,
    publishInChannel      : state.publishInChannel,
    claim                 : state.claim,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClaimChange: (value) => {
      dispatch(updateClaim(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlChooser);
