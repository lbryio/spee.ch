import React from 'react';
import Label from '@components/Label';
import PublishDetailsRow from '@components/PublishDetailsRow';

const ChannelCreatePasswordInput  = ({ value, handlePasswordInput }) => {
  return (
    <PublishDetailsRow
      label={
        <Label value={'Password:'} />
      }
      content={
        <div className='input-area--primary'>
          <input
            type='password'
            name='password'
            className='input-text'
            placeholder=''
            value={value}
            onChange={handlePasswordInput} />
        </div>
      }
    />
  );
};

export default ChannelCreatePasswordInput;
