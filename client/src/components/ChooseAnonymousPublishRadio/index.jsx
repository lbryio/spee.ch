import React from 'react';

const ChooseAnonymousPublishRadio = ({ publishInChannel, toggleAnonymousPublish }) => {
  return (
    <div>
      <input
        type='radio'
        name='anonymous-or-channel'
        id='anonymous-radio'
        className='input-radio'
        value='anonymous'
        checked={!publishInChannel}
        onChange={toggleAnonymousPublish}
      />
      <label
        className='label-radio'
        htmlFor='anonymous-radio'
      >
        Anonymous
      </label>
    </div>
  );
};

export default ChooseAnonymousPublishRadio;
