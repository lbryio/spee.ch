import React from 'react';
import ChannelLoginForm from './channelLoginForm.jsx';
import ChannelCreateForm from './channelCreateForm.jsx';

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
    this.updateLoggedInChannelOutsideReact = this.updateLoggedInChannelOutsideReact.bind(this);
  }
  componentWillMount () {
    if (this.props.loggedInChannelName) {
      this.setState({ optionState: null });
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
    replaceChannelOptionInNavBarChannelSelect(channelName);
  }
  render () {
    return (
      <div>
        { this.props.publishToChannel && (
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
                makePostRequest={this.props.makePostRequest}
                updateLoggedInChannelOutsideReact={this.updateLoggedInChannelOutsideReact}
                updateUploaderState={this.props.updateUploaderState}
                selectOption={this.selectOption}
              /> }
            { (this.state.optionState === CREATE) &&
              <ChannelCreateForm
                cleanseInput={this.props.cleanseInput}
                makeGetRequest={this.props.makeGetRequest}
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

module.exports = ChannelSelector;
