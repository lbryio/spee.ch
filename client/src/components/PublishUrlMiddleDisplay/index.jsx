import React from 'react';
import PropTypes from 'prop-types';

function UrlMiddle ({publishInChannel, selectedChannel, loggedInChannelName, loggedInChannelShortId}) {
  if (publishInChannel) {
    if (selectedChannel === loggedInChannelName) {
      return <span id='url-channel' className='publish-url-text'>{loggedInChannelName}:{loggedInChannelShortId} /</span>;
    }
    return <span id='url-channel-placeholder' className='publish-url-text tooltip'>@channel<span
      className='tooltip-text'>Select a channel below</span> /</span>;
  }
  return (
    <span id='url-no-channel-placeholder' className='publish-url-text tooltip'>xyz<span className='tooltip-text'>This will be a random id</span> /</span>
  );
}

UrlMiddle.propTypes = {
  publishInChannel      : PropTypes.bool.isRequired,
  loggedInChannelName   : PropTypes.string,
  loggedInChannelShortId: PropTypes.string,
};

export default UrlMiddle;
