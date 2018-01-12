import React from 'react';
import PropTypes from 'prop-types';
import ChannelLoginForm from '../containers/ChannelLoginForm.jsx';
import ChannelCreateForm from '../containers/ChannelCreateForm.jsx';
import { connect } from 'react-redux';

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
  }
  componentWillMount () {
    console.log('ChannelSelector will mount');
    if (this.props.loggedInChannelName) {
      this.selectOption(this.props.loggedInChannelName);
    }
  }
  componentWillReceiveProps ({ loggedInChannelName }) {
    if (loggedInChannelName) {
      this.selectOption(loggedInChannelName);
    }
  }
  handleSelection (event) {
    const selectedOption = event.target.selectedOptions[0].value;
    this.selectOption(selectedOption);
  }
  selectOption (option) {
    this.setState({optionState: option});
  }
  render () {
    return (
      <div>
        { this.props.publishInChannel && (
          <div>
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

            { (this.state.optionState === LOGIN) && <ChannelLoginForm /> }

            { (this.state.optionState === CREATE) && <ChannelCreateForm /> }

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

ChannelSelector.propTypes = {
  loggedInChannelName: PropTypes.string,
  publishInChannel   : PropTypes.bool,
};

export default connect(mapStateToProps, null)(ChannelSelector);
