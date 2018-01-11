import React from 'react';
import {connect} from 'react-redux';
import {updateLoggedInChannel} from '../actions/index';
import { makeGetRequest, makePostRequest } from '../utils/xhr.js';
import { setUserCookies } from '../utils/cookies.js';
import { replaceChannelSelectionInNavBar } from '../utils/pageUpdate.js';

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
    this.checkChannelIsAvailable = this.checkChannelIsAvailable.bind(this);
    this.createChannel = this.createChannel.bind(this);
  }
  cleanseChannelInput (input) {
    input = input.replace(/\s+/g, '-'); // replace spaces with dashes
    input = input.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
    return input;
  }
  handleChannelInput (event) {
    event.preventDefault();
    let value = event.target.value;
    value = this.cleanseChannelInput(value);
    this.setState({channel: value});
    this.checkChannelIsAvailable(value);
  }
  handleInput (event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  checkChannelIsAvailable (channel) {
    const that = this;
    makeGetRequest(`/api/channel-is-available/${channel}`)
      .then(() => {
        that.setState({urlError: null});
      })
      .catch((error) => {
        that.setState({error: error.message});
      });
  }
  validatePassword (password) {
    if (!password || password.length < 1) {
      throw new Error('Please provide a password');
    }
  }
  createChannel (event) {
    event.preventDefault();
    const params = `username=${this.state.channel}&password=${this.state.password}`;
    const url = '/signup';
    // validate submission data
    try {
      this.validatePassword(this.state.password);
    } catch (error) {
      return this.setState({error: error.message});
    }
    // publish the channel
    const that = this;
    this.setState({status: 'We are publishing your new channel.  Sit tight...'});
    makePostRequest(url, params)
      .then(result => {
        that.props.onChannelLogin(result.channelName, result.shortChannelId, result.channelClaimId);
        setUserCookies(result.channelName, result.shortChannelId, result.channelClaimId);
        replaceChannelSelectionInNavBar(result.channelName);
      })
      .catch(error => {
        console.log('create channel failure:', error);
        if (error.message) {
          this.setState({'error': error.message});
        } else {
          this.setState({'error': 'Unfortunately, we encountered an error while creating your channel.  Please let us know in Discord!'});
        }
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
              <div className="input-text--primary flex-container--row flex-container--left-bottom">
                <span>@</span>
                <input type="text" name="channel" id="new-channel-name" className="input-text" placeholder="exampleChannelName" value={this.state.channel} onChange={this.handleChannelInput} />
                <span id="input-success-channel-name" className="info-message--success">{'\u2713'}</span>
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
            <p>{this.state.status}</p>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
    },
  };
};

export default connect(null, mapDispatchToProps)(ChannelCreateForm);
