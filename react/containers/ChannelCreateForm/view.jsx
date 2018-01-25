import React from 'react';
import ProgressBar from 'components/ProgressBar';
import request from 'utils/request';

class ChannelCreateForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error   : null,
      channel : '',
      password: '',
      status  : null,
    };
    this.cleanseChannelInput = this.cleanseChannelInput.bind(this);
    this.handleChannelInput = this.handleChannelInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateIsChannelAvailable = this.updateIsChannelAvailable.bind(this);
    this.checkIsChannelAvailable = this.checkIsChannelAvailable.bind(this);
    this.checkIsPasswordProvided = this.checkIsPasswordProvided.bind(this);
    this.makePublishChannelRequest = this.makePublishChannelRequest.bind(this);
    this.createChannel = this.createChannel.bind(this);
  }
  cleanseChannelInput (input) {
    input = input.replace(/\s+/g, '-'); // replace spaces with dashes
    input = input.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
    return input;
  }
  handleChannelInput (event) {
    let value = event.target.value;
    value = this.cleanseChannelInput(value);
    this.setState({channel: value});
    if (value) {
      this.updateIsChannelAvailable(value);
    } else {
      this.setState({error: 'Please enter a channel name'});
    }
  }
  handleInput (event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  updateIsChannelAvailable (channel) {
    const that = this;
    const channelWithAtSymbol = `@${channel}`;
    request(`/api/channel-is-available/${channelWithAtSymbol}`)
      .then(isAvailable => {
        if (isAvailable) {
          that.setState({'error': null});
        } else {
          that.setState({'error': 'That channel has already been claimed'});
        }
      })
      .catch((error) => {
        that.setState({'error': error.message});
      });
  }
  checkIsChannelAvailable (channel) {
    const channelWithAtSymbol = `@${channel}`;
    return new Promise((resolve, reject) => {
      request(`/api/channel-is-available/${channelWithAtSymbol}`)
        .then(isAvailable => {
          console.log('checkIsChannelAvailable result:', isAvailable);
          if (!isAvailable) {
            return reject(new Error('That channel has already been claimed'));
          }
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  checkIsPasswordProvided () {
    const password = this.state.password;
    return new Promise((resolve, reject) => {
      if (!password || password.length < 1) {
        console.log('password not provided');
        return reject(new Error('Please provide a password'));
      }
      console.log('password provided');
      resolve();
    });
  }
  makePublishChannelRequest (username, password) {
    const params = {
      method : 'POST',
      body   : JSON.stringify({username, password}),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'include',
    };
    return new Promise((resolve, reject) => {
      request('/signup', params)
        .then(result => {
          console.log('makePublishChannelRequest result:', result);
          return resolve(result);
        })
        .catch(error => {
          console.log('create channel request failed:', error);
          reject(new Error('Unfortunately, we encountered an error while creating your channel.  Please let us know in Discord!'));
        });
    });
  }
  createChannel (event) {
    event.preventDefault();
    const that = this;
    this.checkIsPasswordProvided()
      .then(() => {
        return that.checkIsChannelAvailable(that.state.channel, that.state.password);
      })
      .then(() => {
        that.setState({status: 'We are publishing your new channel.  Sit tight...'});
        return that.makePublishChannelRequest(that.state.channel, that.state.password);
      })
      .then(result => {
        that.setState({status: null});
        that.props.onChannelLogin(result.channelName, result.shortChannelId, result.channelClaimId);
      })
      .catch((error) => {
        that.setState({'error': error.message, status: null});
      });
  }
  render () {
    return (
      <div>
        { !this.state.status ? (
          <form id="publish-channel-form">
            <p id="input-error-channel-name" className="info-message-placeholder info-message--failure">{this.state.error}</p>
            <div className="row row--wide row--short">
              <div className="column column--3 column--sml-10">
                <label className="label" htmlFor="new-channel-name">Name:</label>
              </div><div className="column column--6 column--sml-10">
                <div className="input-text--primary flex-container--row flex-container--left-bottom span--relative">
                  <span>@</span>
                  <input type="text" name="channel" id="new-channel-name" className="input-text" placeholder="exampleChannelName" value={this.state.channel} onChange={this.handleChannelInput} />
                  { (this.state.channel && !this.state.error) && <span id="input-success-channel-name" className="info-message--success span--absolute">{'\u2713'}</span> }
                  { this.state.error && <span id="input-success-channel-name" className="info-message--failure span--absolute">{'\u2716'}</span> }
                </div>
              </div>
            </div>
            <div className="row row--wide row--short">
              <div className="column column--3 column--sml-10">
                <label className="label" htmlFor="new-channel-password">Password:</label>
              </div><div className="column column--6 column--sml-10">
                <div className="input-text--primary">
                  <input type="password" name="password" id="new-channel-password" className="input-text"  placeholder="" value={this.state.password} onChange={this.handleInput} />
                </div>
              </div>
            </div>

            <div className="row row--wide">
              <button className="button--primary" onClick={this.createChannel}>Create Channel</button>
            </div>
          </form>
        ) : (
          <div>
            <p className="fine-print">{this.state.status}</p>
            <ProgressBar size={12}/>
          </div>
        )}
      </div>
    );
  }
}

export default ChannelCreateForm;
