import React from 'react';

const ChooseChannelPublishRadio = ({ publishInChannel, toggleAnonymousPublish }) => {
  return (
    <div>
      <input
        type='radio'
        name='anonymous-or-channel'
        id='channel-radio'
        className='input-radio'
        value='in a channel'
        checked={publishInChannel}
        onChange={toggleAnonymousPublish}
      />
      <label
        className='label label--pointer'
        htmlFor='channel-radio'
      >
        In a channel
      </label>
    </div>
  );
}

export default ChooseChannelPublishRadio;
