import React from 'react';

function NavBarChannelDropdown ({ channelName, handleSelection, defaultSelection, VIEW, LOGOUT }) {
  return (
    <select type='text' id='nav-bar-channel-select' className='select select--arrow link--nav' onChange={handleSelection} value={defaultSelection}>
      <option id='nav-bar-channel-select-channel-option'>{channelName}</option>
      <option value={VIEW}>View</option>
      <option value={LOGOUT}>Logout</option>
    </select>
  );
};

export default NavBarChannelDropdown;
