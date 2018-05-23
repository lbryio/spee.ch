import React from 'react';
import request from '../../utils/request';

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
      <form id='channel-login-form'>
        <div className='row row--wide row--short'>
          <div className='column column--3 column--sml-10'>
            <label className='label' htmlFor='channel-login-name-input'>Name:</label>
          </div><div className='column column--6 column--sml-10'>
            <div className='input-text--primary flex-container--row flex-container--left-bottom'>
              <span>@</span>
              <input type='text' id='channel-login-name-input' className='input-text' name='name' placeholder='Your Channel Name' value={this.state.channelName} onChange={this.handleInput} />
            </div>
          </div>
        </div>
        <div className='row row--wide row--short'>
          <div className='column column--3 column--sml-10'>
            <label className='label' htmlFor='channel-login-password-input' >Password:</label>
          </div><div className='column column--6 column--sml-10'>
            <div className='input-text--primary'>
              <input type='password' id='channel-login-password-input' name='password' className='input-text' placeholder='' value={this.state.channelPassword} onChange={this.handleInput} />
            </div>
          </div>
        </div>
        { this.state.error ? (
          <p className='info-message--failure'>{this.state.error}</p>
        ) : (
          <p className='info-message'>Enter the name and password for your channel</p>
        )}
        <div className='row row--wide'>
          <button className='button--primary' onClick={this.loginToChannel}>Authenticate</button>
        </div>
      </form>
    );
  }
}

export default ChannelLoginForm;
