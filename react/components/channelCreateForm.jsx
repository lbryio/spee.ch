import React from 'react';

function ChannelSuccess (message) {
  return (
    <div>
      <p>{this.props.message}</p>
    </div>
  );
}

function ChannelInProgress () {
  return (
    <div id="channel-publish-in-progress">
      <p>Creating your new channel.  This may take a few seconds...</p>
      <div id="create-channel-progress-bar"></div>
    </div>
  );
}



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
  createChannel (event) {
    event.preventDefault();
    // publishNewChannel(event)
  }
  render () {
    return (
      <form id="publish-channel-form">
        <p id="input-error-channel-name" className="info-message-placeholder info-message--failure">{this.state.error}</p>
        <div className="row row--wide row--short">
          <div className="column column--3 column--sml-10">
            <label className="label" htmlFor="new-channel-name">Name:</label>
          </div><div className="column column--6 column--sml-10">
            <div className="input-text--primary flex-container--row flex-container--left-bottom">
              <span>@</span>
              <input type="text" name="new-channel-name" id="new-channel-name" className="input-text" placeholder="exampleChannelName" value={this.channel} onChange={this.handleChannelInput} />
                <span id="input-success-channel-name" className="info-message--success">{'\u2713'}</span>
            </div>
          </div>
        </div>
        <div className="row row--wide row--short">
          <div className="column column--3 column--sml-10">
            <label className="label" htmlFor="new-channel-password">Password:</label>
          </div><div className="column column--6 column--sml-10">
            <div className="input-text--primary">
              <input type="password" name="new-channel-password" id="new-channel-password" className="input-text"  placeholder="" value={this.password} onChange={this.handleInput} />
            </div>
          </div>
        </div>

        <div className="row row--wide">
          <button className="button--primary" onClick={this.createChannel}>Create</button>
        </div>
      </form>
    );
  }
}

module.exports = ChannelCreateForm;
