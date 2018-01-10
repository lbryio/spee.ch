import React from 'react';
import ChannelLoginForm from './ChannelLoginForm.jsx';
import ChannelCreateForm from './ChannelCreateForm.jsx';
import { connect } from 'react-redux';
import { setUserCookies } from '../utils/cookies.js';

const LOGIN = 'login';
const CREATE = 'create';

class ChannelSelector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      optionState: LOGIN,
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.replaceChannelSelectionInNavBar = this.replaceChannelSelectionInNavBar.bind(this);
    this.updateLoggedInChannelOutsideReact = this.updateLoggedInChannelOutsideReact.bind(this);
  }
  componentWillMount () {
    if (this.props.loggedInChannelName) {
      this.setState({ optionState: this.props.loggedInChannelName });
    }
  }
  handleSelection (event) {
    const selectedOption = event.target.selectedOptions[0].value;
    this.selectOption(selectedOption);
  }
  selectOption (option) {
    this.setState({optionState: option});
  }
  updateLoggedInChannelOutsideReact (channelName, channelClaimId, shortChannelId) {
    // update anywhere on page that needs to be updated outside of this component
    setUserCookies(channelName, channelClaimId, shortChannelId);
    this.replaceChannelSelectionInNavBar(channelName);
  }
  replaceChannelSelectionInNavBar (loggedInChannel) {
    // remove the old channel option
    const oldChannel = document.getElementById('nav-bar-channel-select-channel-option');
    if (oldChannel) {
      oldChannel.parentNode.removeChild(oldChannel);
    }
    // create new channel option & select it
    const newChannelOption = document.createElement('option');
    newChannelOption.setAttribute('value', loggedInChannel);
    newChannelOption.setAttribute('id', 'nav-bar-channel-select-channel-option');
    newChannelOption.setAttribute('selected', '');
    newChannelOption.innerText = loggedInChannel;
    // add the new option
    const channelSelect = document.getElementById('nav-bar-channel-select');
    channelSelect.style.display = 'inline-block';
    channelSelect.insertBefore(newChannelOption, channelSelect.firstChild);
    // hide login
    const navBarLoginLink = document.getElementById('nav-bar-login-link');
    navBarLoginLink.style.display = 'none';
  }
  render () {
    return (
      <div>
        { this.props.publishInChannel && (
          <div className="row row--padded row--no-top row--no-bottom row--wide">

            <p id="input-error-channel-select" className="info-message-placeholder info-message--failure">{this.props.channelError}</p>

            <div className="column column--3">
              <label className="label" htmlFor="channel-name-select">Channel:</label>
            </div><div className="column column--7">
              <select type="text" id="channel-name-select" className="select select--arrow" value={this.state.optionState} onChange={this.handleSelection}>
                { this.props.loggedInChannelName && <option value={this.props.loggedInChannelName} id="publish-channel-select-channel-option">{this.props.loggedInChannelName}</option> }
                <option value="login">Existing</option>
                <option value="create">New</option>
              </select>
            </div>

            { (this.state.optionState === LOGIN) &&
              <ChannelLoginForm
                updateLoggedInChannelOutsideReact={this.updateLoggedInChannelOutsideReact}
                updateUploaderState={this.props.updateUploaderState}
                selectOption={this.selectOption}
              /> }
            { (this.state.optionState === CREATE) &&
              <ChannelCreateForm
                updateLoggedInChannelOutsideReact={this.updateLoggedInChannelOutsideReact}
                updateUploaderState={this.props.updateUploaderState}
                selectOption={this.selectOption}
              /> }

          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInChannelName: state.loggedInChannel.name,
    publishInChannel   : state.publishInChannel,
  };
};

export default connect(mapStateToProps, null)(ChannelSelector);
