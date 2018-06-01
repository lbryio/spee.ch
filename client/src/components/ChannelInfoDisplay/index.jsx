import React from 'react';

const ChannelInfoDisplay = ({name, longId, shortId}) => {
  return (
    <div>
      <h2>channel name: {name}</h2>
      <p className={'fine-print'}>full channel id: {longId}</p>
      <p className={'fine-print'}>short channel id: {shortId}</p>
    </div>
  );
};

export default ChannelInfoDisplay;
