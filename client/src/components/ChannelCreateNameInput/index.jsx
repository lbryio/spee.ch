import React from 'react';
import Label from '@components/Label';
import PublishDetailsRow from '@components/PublishDetailsRow';

const ChannelCreateNameInput  = ({ value, error, handleNameInput }) => {
  return (
    <PublishDetailsRow
      label={
        <Label value={'Name:'} />
      }
      content={
        <div className='input-area--primary'>
          <span>@</span>
          <input
            type='text'
            name='channel'
            className='input-text'
            placeholder='exampleChannelName'
            value={value}
            onChange={handleNameInput}
          />
          { (value && !error) && (
            <span className='info-message--success span--absolute'>
              {'\u2713'}
            </span>
          )}
          { error && (
            <span className='info-message--failure span--absolute'>
              {'\u2716'}
            </span>
          )}
        </div>
      }
    />
  );
};

export default ChannelCreateNameInput;
