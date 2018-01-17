import React from 'react';
import ChannelLoginForm from 'containers/ChannelLoginForm';
import ChannelCreateForm from 'containers/ChannelCreateForm';

const LOGIN = 'Existing';
const CREATE = 'New';

class ChannelSelect extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedOption: LOGIN,
    };
    this.toggleAnonymousPublish = this.toggleAnonymousPublish.bind(this);
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
  toggleAnonymousPublish (event) {
    const value = event.target.value;
    if (value === 'anonymous') {
      this.props.onPublishInChannelChange(false);
    } else {
      this.props.onPublishInChannelChange(true);
    }
  }
  handleSelection (event) {
    const selectedOption = event.target.selectedOptions[0].value;
    this.selectOption(selectedOption);
  }
  selectOption (option) {
    this.setState({selectedOption: option});
  }
  render () {
    return (
      <div>
        <form>
          <div className="column column--3 column--med-10">
            <input type="radio" name="anonymous-or-channel" id="anonymous-radio" className="input-radio" value="anonymous" checked={!this.props.publishInChannel} onChange={this.toggleAnonymousPublish}/>
            <label className="label label--pointer" htmlFor="anonymous-radio">Anonymous</label>
          </div>
          <div className="column column--7 column--med-10">
            <input type="radio" name="anonymous-or-channel" id="channel-radio" className="input-radio" value="in a channel" checked={this.props.publishInChannel} onChange={this.toggleAnonymousPublish}/>
            <label className="label label--pointer" htmlFor="channel-radio">In a channel</label>
          </div>
        </form>
        { this.props.publishInChannel && (
          <div>
            <p id="input-error-channel-select" className="info-message-placeholder info-message--failure">{this.props.channelError}</p>
            <div className="column column--3">
              <label className="label" htmlFor="channel-name-select">Channel:</label>
            </div><div className="column column--7">
            <select type="text" id="channel-name-select" className="select select--arrow" value={this.state.selectedOption} onChange={this.handleSelection}>
              { this.props.loggedInChannelName && <option value={this.props.loggedInChannelName} id="publish-channel-select-channel-option">{this.props.loggedInChannelName}</option> }
              <option value={LOGIN}>Existing</option>
              <option value={CREATE}>New</option>
            </select>
          </div>
            { (this.state.selectedOption === LOGIN) && <ChannelLoginForm /> }
            { (this.state.selectedOption === CREATE) && <ChannelCreateForm /> }
          </div>
        )}
      </div>
    );
  }
}

export default ChannelSelect;
