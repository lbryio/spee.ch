import React from 'react';

const ChannelInfoDisplay = ({name, longId, shortId}) => {
  return (
    <div>
      <h2>channel name: {name}</h2>
      <p className={'text--secondary'}>full channel id: {longId}</p>
      <p className={'text--secondary'}>short channel id: {shortId}</p>
    </div>
  );
};

export default ChannelInfoDisplay;
