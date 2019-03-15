import React from 'react';
import { LOGIN, CREATE } from '../../constants/publish_channel_select_states';

const ChannelSelectDropdown = ({ selectedChannel, handleSelection, loggedInChannelName }) => {
  return (
    <select
      id='channel-name-select'
      value={selectedChannel}
      onChange={handleSelection}>
      { loggedInChannelName && (
        <option value={loggedInChannelName} >{loggedInChannelName}</option>
      )}
      <option value={LOGIN}>Existing</option>
      <option value={CREATE}>New</option>
    </select>
  );
};

export default ChannelSelectDropdown;
