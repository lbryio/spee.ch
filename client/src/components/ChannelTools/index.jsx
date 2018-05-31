import React from 'react';
import ChannelLoginForm from '@containers/ChannelLoginForm';
import ChannelCreateForm from '@containers/ChannelCreateForm';

const ChannelTools = () => {
  return (
    <div>
      <h3 className='h3--no-bottom'>Log in to an existing channel:</h3>
      <ChannelLoginForm />
      <h3 className='h3--no-bottom'>Create a brand new channel:</h3>
      <ChannelCreateForm />
    </div>
  );
};

export default ChannelTools;
