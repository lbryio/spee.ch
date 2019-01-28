import React from 'react';
// TODO: factor out longId OR implement tooltip display
const ChannelInfoDisplay = ({name, longId, shortId}) => {
  return (
    <div>
      <h2>{name}:{shortId}</h2>
    </div>
  );
};

export default ChannelInfoDisplay;
