import React from 'react';
import ChannelLoginForm from '@containers/ChannelLoginForm';
import ChannelCreateForm from '@containers/ChannelCreateForm';
import Row from '@components/Row';

const ChannelTools = () => {
  return (
    <div>
      <Row>
        <h3>Log in to an existing channel:</h3>
        <ChannelLoginForm />
      </Row>
      <Row>
        <h3>Create a brand new channel:</h3>
        <ChannelCreateForm />
      </Row>
    </div>
  );
};

export default ChannelTools;
