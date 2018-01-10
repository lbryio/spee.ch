import React from 'react';

function UrlMiddle ({publishToChannel, loggedInChannelName, loggedInChannelShortId}) {
  if (publishToChannel) {
    if (loggedInChannelName) {
      return <span id="url-channel" className="url-text--secondary">{loggedInChannelName}:{loggedInChannelShortId} /</span>;
    }
    return <span id="url-channel-placeholder" className="url-text--secondary tooltip">@channel<span
      className="tooltip-text">Select a channel below</span> /</span>;
  }
  return (
    <span id="url-no-channel-placeholder" className="url-text--secondary tooltip">xyz<span className="tooltip-text">This will be a random id</span> /</span>
  );
}

export default UrlMiddle;
