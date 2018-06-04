import React from 'react';
import { LOGIN, CREATE } from '../../constants/publish_channel_select_states';

const ChannelSelectDropdown = ({ selectedChannel, handleSelection, loggedInChannelName }) => {
  return (
    <select
      id='channel-name-select'
      className='select select--arrow'
      value={selectedChannel}
      onChange={handleSelection}>
      { loggedInChannelName && (
        <option
          value={loggedInChannelName}
          id='publish-channel-select-channel-option'
        >
          {loggedInChannelName}
        </option>
      )}
      <option value={LOGIN}>Existing</option>
      <option value={CREATE}>New</option>
    </select>
  );
};

export default ChannelSelectDropdown;
