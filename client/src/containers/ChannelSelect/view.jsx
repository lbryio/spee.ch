import React from 'react';
import ChannelLoginForm from '@containers/ChannelLoginForm';
import ChannelCreateForm from '@containers/ChannelCreateForm';
import { LOGIN, CREATE } from '../../constants/publish_channel_select_states';
import PublishDetailsRow from '@components/PublishDetailsRow';
import ChooseAnonymousPublishRadio from '@components/ChooseAnonymousPublishRadio';
import ChooseChannelPublishRadio from '@components/ChooseChannelPublishRadio';
import ErrorDisplay from '@components/ErrorDisplay';
import Label from '@components/Label';
import ChannelSelectDropdown from '@components/ChannelSelectDropdown';

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
        <PublishDetailsRow
          label={
            <ChooseAnonymousPublishRadio
              publishInChannel={this.props.publishInChannel}
              toggleAnonymousPublish={this.toggleAnonymousPublish}
            />
          }
          content={
            <ChooseChannelPublishRadio
              publishInChannel={this.props.publishInChannel}
              toggleAnonymousPublish={this.toggleAnonymousPublish}
            />
          }
        />
        <ErrorDisplay
          errorMessage={this.props.channelError}
          defaultMessage={'Publish anonymously or in a channel'}
        />

        { this.props.publishInChannel && (
          <div>
            <PublishDetailsRow
              label={
                <Label value={'Channel:'} />
              }
              content={
                <ChannelSelectDropdown
                  selectedChannel={this.props.selectedChannel}
                  handleSelection={this.handleSelection}>
                  loggedInChannelName={this.props.loggedInChannelName}
                </ChannelSelectDropdown>
              }
            />
            { (this.props.selectedChannel === LOGIN) && <ChannelLoginForm /> }
            { (this.props.selectedChannel === CREATE) && <ChannelCreateForm /> }
          </div>
        )}
      </div>
    );
  }
}

export default ChannelSelect;
