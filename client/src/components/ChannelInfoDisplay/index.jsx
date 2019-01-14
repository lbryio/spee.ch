import React from 'react';

const ChannelInfoDisplay = ({name, longId, shortId}) => {
  return (
    <div>
      <h2>{name}:{shortId}</h2>
    </div>
  );
};

export default ChannelInfoDisplay;
