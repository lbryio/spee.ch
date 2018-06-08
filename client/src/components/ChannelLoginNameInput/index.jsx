import React from 'react';
import RowLabeled from '@components/RowLabeled';
import Label from '@components/Label';

const ChannelLoginNameInput  = ({ channelName, handleInput }) => {
  return (
    <RowLabeled
      label={
        <Label value={'Name:'} />
      }
      content={
        <div className='input-area--primary'>
          <span>@</span>
          <input
            type='text'
            id='channel-login-name-input'
            className='input-text'
            name='name'
            placeholder='Your Channel Name'
            value={channelName}
            onChange={handleInput}
          />
        </div>
      }
    />
  );
};

export default ChannelLoginNameInput;
