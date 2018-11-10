import React from 'react';
import request from '../../utils/request';
import FormFeedbackDisplay from '@components/FormFeedbackDisplay';
import ChannelLoginNameInput from '@components/ChannelLoginNameInput';
import ChannelLoginPasswordInput from '@components/ChannelLoginPasswordInput';
import ButtonPrimary from '@components/ButtonPrimary';

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
      <form className="form-group" onSubmit={this.loginToChannel}>
        <ChannelLoginNameInput
          channelName={this.state.channelName}
          handleInput={this.handleInput}
        />
        <ChannelLoginPasswordInput
          channelPassword={this.state.channelPassword}
          handleInput={this.handleInput}
        />
        <FormFeedbackDisplay errorMessage={this.state.error} />
        <ButtonPrimary
          type={'submit'}
          value={'Authenticate'}
          onClickHandler={this.loginToChannel}
        />
    </form>
    );
  }
}

export default ChannelLoginForm;
