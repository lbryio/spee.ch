import React from 'react';
import { getUserCookies, clearUserCookies } from 'utils/cookies';

const VIEW = 'VIEW';
const LOGOUT = 'LOGOUT';

function Logo () {
  return (
    <svg version="1.1" id="Layer_1" x="0px" y="0px" height="24px" viewBox="0 0 80 31" enableBackground="new 0 0 80 31" className="nav-bar-logo">
      <a href="/">
        <title>Logo</title>
        <desc>Spee.ch logo</desc>
        <g id="About">
            <g id="Publish-Form-V2-_x28_filled_x29_" transform="translate(-42.000000, -23.000000)">
                <g id="Group-17" transform="translate(42.000000, 22.000000)">
                    <text transform="matrix(1 0 0 1 0 20)" fontSize="25" fontFamily="Roboto">Spee&lt;h</text>
                    <g id="Group-16" transform="translate(0.000000, 30.000000)">
                        <path id="Line-8" fill="none" stroke="#09F911" strokeWidth="1" strokeLinecap="square" d="M0.5,1.5h15"/>
                        <path id="Line-8-Copy" fill="none" stroke="#029D74" strokeWidth="1" strokeLinecap="square" d="M16.5,1.5h15"/>
                        <path id="Line-8-Copy-2" fill="none" stroke="#E35BD8" strokeWidth="1" strokeLinecap="square" d="M32.5,1.5h15"/>
                        <path id="Line-8-Copy-3" fill="none" stroke="#4156C5" strokeWidth="1" strokeLinecap="square" d="M48.5,1.5h15"/>
                        <path id="Line-8-Copy-4" fill="none" stroke="#635688" strokeWidth="1" strokeLinecap="square" d="M64.5,1.5h15"/>
                    </g>
                </g>
            </g>
        </g>
      </a>
    </svg>
  );
}

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.checkForLoggedInUser = this.checkForLoggedInUser.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentDidMount () {
    this.checkForLoggedInUser();
  }
  checkForLoggedInUser () {
    // check for whether a channel is already logged in
    let channelName, channelShortId, channelLongId;
    ({ channelName, channelShortId, channelLongId } = getUserCookies());
    console.log(`userCookies`, getUserCookies());
    console.log(`cookies found for channel: ${channelName} ${channelShortId} ${channelLongId}`);
    this.props.onChannelLogin(channelName, channelShortId, channelLongId);
  }
  handleSelection (event) {
    const value = event.target.selectedOptions[0].value;
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
            <a className="nav-bar-link link--nav" href="/">Publish</a>
            <a className="nav-bar-link link--nav" href="/about">About</a>
            { this.props.channelName ? (
              <select type="text" id="nav-bar-channel-select" className="select select--arrow link--nav" onChange={this.handleSelection}>
                <option id="nav-bar-channel-select-channel-option">{this.props.channelName}</option>
                <option value={VIEW}>View</option>
                <option value={LOGOUT}>Logout</option>
              </select>
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
