import React from 'react';

class ChannelCreateForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error   : null,
      channel : null,
      password: null,
      status  : null,
    };
    this.handleChannelInput = this.handleChannelInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.checkChannelIsAvailable = this.checkChannelIsAvailable.bind(this);
    this.createChannel = this.createChannel.bind(this);
  }
  handleChannelInput (event) {
    event.preventDefault();
    const name = event.target.name;
    let value = event.target.value;
    value = this.props.cleanseInput(value);
    this.setState({[name]: value});
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
    this.props.makeGetRequest(`/api/channel-is-available/${channel}`)
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
    this.props.makePostRequest(url, params)
      .then(result => {
        that.props.updateLoggedInChannelOutsideReact(result.channelName, result.channelClaimId, result.shortChannelId);
        that.props.updateUploaderState('loggedInChannelName', result.channelName);
        that.props.updateUploaderState('loggedInChannelShortId', result.shortChannelId);
        that.props.selectOption(result.channelName);
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
                <input type="text" name="channel" id="new-channel-name" className="input-text" placeholder="exampleChannelName" value={this.channel} onChange={this.handleChannelInput} />
                <span id="input-success-channel-name" className="info-message--success">{'\u2713'}</span>
              </div>
            </div>
            </div>
            <div className="row row--wide row--short">
              <div className="column column--3 column--sml-10">
                <label className="label" htmlFor="new-channel-password">Password:</label>
              </div><div className="column column--6 column--sml-10">
              <div className="input-text--primary">
                <input type="password" name="password" id="new-channel-password" className="input-text"  placeholder="" value={this.password} onChange={this.handleInput} />
              </div>
            </div>
            </div>

            <div className="row row--wide">
              <button className="button--primary" onClick={this.createChannel}>Create</button>
            </div>
          </form>
        ) : (
            <p>{this.state.status}</p>
        )}
      </div>
    );
  }
}

module.exports = ChannelCreateForm;
