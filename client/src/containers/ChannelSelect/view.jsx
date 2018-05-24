import React from 'react';
import ChannelLoginForm from '@containers/ChannelLoginForm';
import ChannelCreateForm from '@containers/ChannelCreateForm';
import * as states from '../../constants/publish_channel_select_states';

class ChannelSelect extends React.Component {
  constructor (props) {
    super(props);
    this.toggleAnonymousPublish = this.toggleAnonymousPublish.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
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
    this.props.onChannelSelect(selectedOption);
  }
  render () {
    return (
      <div>
        <form>
          <div className='column column--3 column--med-10'>
            <input type='radio' name='anonymous-or-channel' id='anonymous-radio' className='input-radio' value='anonymous' checked={!this.props.publishInChannel} onChange={this.toggleAnonymousPublish} />
            <label className='label label--pointer' htmlFor='anonymous-radio'>Anonymous</label>
          </div>
          <div className='column column--7 column--med-10'>
            <input type='radio' name='anonymous-or-channel' id='channel-radio' className='input-radio' value='in a channel' checked={this.props.publishInChannel} onChange={this.toggleAnonymousPublish} />
            <label className='label label--pointer' htmlFor='channel-radio'>In a channel</label>
          </div>
          { this.props.channelError ? (
            <p className='info-message--failure'>{this.props.channelError}</p>
          ) : (
            <p className='info-message'>Publish anonymously or in a channel</p>
          )}
        </form>
        { this.props.publishInChannel && (
          <div>
            <div className='column column--3'>
              <label className='label' htmlFor='channel-name-select'>Channel:</label>
            </div><div className='column column--7'>
              <select type='text' id='channel-name-select' className='select select--arrow' value={this.props.selectedChannel} onChange={this.handleSelection}>
                { this.props.loggedInChannelName && <option value={this.props.loggedInChannelName} id='publish-channel-select-channel-option'>{this.props.loggedInChannelName}</option> }
                <option value={states.LOGIN}>Existing</option>
                <option value={states.CREATE}>New</option>
              </select>
            </div>
            { (this.props.selectedChannel === states.LOGIN) && <ChannelLoginForm /> }
            { (this.props.selectedChannel === states.CREATE) && <ChannelCreateForm /> }
          </div>
        )}
      </div>
    );
  }
}

export default ChannelSelect;
