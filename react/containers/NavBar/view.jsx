import React from 'react';
import { getUserCookies, clearUserCookies } from 'utils/cookies';
import Logo from 'components/Logo';
import NavBarChannelDropdown from 'components/NavBarChannelDropdown';

const VIEW = 'VIEW';
const LOGOUT = 'LOGOUT';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.checkForLoggedInUser = this.checkForLoggedInUser.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentDidMount () {
    // check to see if the user is already logged in
    this.checkForLoggedInUser();
  }
  checkForLoggedInUser () {
    // check for whether a channel is already logged in
    let channelName, channelShortId, channelLongId;
    ({ channelName, channelShortId, channelLongId } = getUserCookies());
    console.log(`cookies found for channel: ${channelName} ${channelShortId} ${channelLongId}`);
    if (channelName) {
      this.props.onChannelLogin(channelName, channelShortId, channelLongId);
    }
  }
  handleSelection (event) {
    console.log('handling selection', event)
    const value = event.target.selectedOptions[0].value;
    console.log('value', value);
    switch (value) {
      case LOGOUT:
        // remove session cookies
        clearUserCookies();
        // send logout request to server
        window.location.href = '/logout';
        break;
      case VIEW:
        // redirect to channel page
        window.location.href = `/${this.props.channelName}:${this.props.channelLongId}`;
        break;
      default:
        break;
    }
  }
  render () {
    return (
      <div className="row row--wide nav-bar">
        <div className="row row--padded row--short flex-container--row flex-container--space-between-center">
          <Logo />
          <div className="nav-bar--center">
            <span className="nav-bar-tagline">Open-source, decentralized image and video sharing.</span>
          </div>
          <div className="nav-bar--right">
            <a className="nav-bar-link link--nav-active" href="/">Publish</a>
            <a className="nav-bar-link link--nav" href="/about">About</a>
            { this.props.channelName ? (
              <NavBarChannelDropdown
                channelName={this.props.channelName}
                handleSelection={this.handleSelection}
                VIEW={VIEW}
                LOGOUT={LOGOUT}
              />
            ) : (
              <a id="nav-bar-login-link" className="nav-bar-link link--nav" href="/login">Channel</a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
