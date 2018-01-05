import React from 'react';
import ChannelLoginForm from './channelLoginForm.jsx';
import ChannelCreateForm from './channelCreateForm.jsx';

const LOGIN = 'login';
const CREATE = 'create';

class ChannelSelector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayCreateOrLogin: LOGIN,
    };
    this.toggleCreateOrLogin = this.toggleCreateOrLogin.bind(this);
  }
  componentWillMount () {
    if (this.props.loggedInChannelName) {
      this.setState({ displayCreateOrLogin: null });
    }
  }
  toggleCreateOrLogin (event) {
    const selectedOption = event.target.selectedOptions[0].value;
    if (selectedOption === 'login') {
      this.setState({ displayCreateOrLogin: LOGIN });
    } else if (selectedOption === 'create') {
      this.setState({ displayCreateOrLogin: CREATE });
    } else {
      this.setState({ displayCreateOrLogin: null });
    }
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
              <select type="text" id="channel-name-select" className="select select--arrow" onChange={this.toggleCreateOrLogin}>
                { this.props.loggedInChannelName && <option value={this.props.loggedInChannelName} id="publish-channel-select-channel-option">{this.props.loggedInChannelName}</option> }
                <option value="login">Existing</option>
                <option value="create">New</option>
              </select>
            </div>

            { (this.state.displayCreateOrLogin === LOGIN) && <ChannelLoginForm /> }
            { (this.state.displayCreateOrLogin === CREATE) &&
                <ChannelCreateForm
                  makeGetRequest={this.props.makeGetRequest}
                  cleanseInput={this.props.cleanseInput}
                /> }

          </div>
        )}
      </div>
    );
  }
}

module.exports = ChannelSelector;
