import React from 'react';
import ChannelLoginForm from '@containers/ChannelLoginForm';
import ChannelCreateForm from '@containers/ChannelCreateForm';
import Row from '@components/Row';

class ChannelTools extends React.Component {
  render () {
    return (
      <div>
        <h3 className="form-title">Log in to existing channel</h3>
        <ChannelLoginForm />
        {!this.props.closedRegistration && (
          <React.Fragment>
            <h3 className="form-title">Create new channel</h3>
            <ChannelCreateForm />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ChannelTools;
