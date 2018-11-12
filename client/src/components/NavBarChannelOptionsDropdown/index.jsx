import React from 'react';

function NavBarChannelDropdown ({ channelName, handleSelection, defaultSelection, VIEW, LOGOUT }) {
  return (
    <div className={'nav-bar-link link--nav'}>
      <select
        type='text'
        id='nav-bar-channel-select'
        onChange={handleSelection}
        value={defaultSelection}
      >
        <option id='nav-bar-channel-select-channel-option'>{channelName}</option>
        <option value={VIEW}>View</option>
        <option value={LOGOUT}>Logout</option>
      </select>
    </div>
  );
}

export default NavBarChannelDropdown;
