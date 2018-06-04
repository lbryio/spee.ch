import React from 'react';
import request from '../../utils/request';
import ErrorDisplay from '@components/ErrorDisplay';
import PublishDetailsRow from '@components/PublishDetailsRow';
import Label from '@components/Label';

const ChannelLoginNameInput  = ({ channelName, handleInput }) => {
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

const ChannelLoginPasswordInput  = ({ channelPassword, handleInput }) => {
  return (
    <PublishDetailsRow
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

class ChannelLoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error   : null,
      name    : '',
      password: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.loginToChannel = this.loginToChannel.bind(this);
  }
  handleInput (event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  loginToChannel (event) {
    event.preventDefault();
    const params = {
      method : 'POST',
      body   : JSON.stringify({username: this.state.name, password: this.state.password}),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'include',
    };
    request('login', params)
      .then(({success, channelName, shortChannelId, channelClaimId, message}) => {
        if (success) {
          this.props.onChannelLogin(channelName, shortChannelId, channelClaimId);
        } else {
          this.setState({'error': message});
        };
      })
      .catch(error => {
        if (error.message) {
          this.setState({'error': error.message});
        } else {
          this.setState({'error': error});
        }
      });
  }
  render () {
    return (
      <div>
        <ChannelLoginNameInput
          channelName={this.state.channelName}
          handleInput={this.handleInput}
        />
        <ChannelLoginPasswordInput
          channelPassword={this.state.channelPassword}
          handleInput={this.handleInput}
        />
        <ErrorDisplay
          errorMessage={this.state.error}
          defaultMessage={'Enter the name and password for your channel'}
        />
        <button className='button--primary' onClick={this.loginToChannel}>Authenticate</button>
      </div>
    );
  }
}

export default ChannelLoginForm;
