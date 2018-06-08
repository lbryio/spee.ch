import React from 'react';
import RowLabeled from '@components/RowLabeled';
import Label from '@components/Label';

const ChannelLoginPasswordInput  = ({ channelPassword, handleInput }) => {
  return (
    <RowLabeled
      label={
        <Label value={'Password:'} />
      }
      content={
        <div className='input-area--primary'>
          <input
            type='password'
            id='channel-login-password-input'
            name='password'
            className='input-text'
            placeholder=''
            value={channelPassword}
            onChange={handleInput}
          />
        </div>
      }
    />
  );
};

export default ChannelLoginPasswordInput;
