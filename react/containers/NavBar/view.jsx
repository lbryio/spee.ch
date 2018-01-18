import React from 'react';

const VIEW = 'VIEW';
const LOGOUT = 'LOGOUT';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedOption: '',
    }
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentDidMount () {
    // set first selected option
  }
  handleSelection (event) {
    const value = event.target.selectedOptions[0].value;
    switch (value) {
      case 'logout':
        break;
      case 'view':
        break;
      default:
        break;
    }
  }
  render () {
    return (
      <div className="row row--wide nav-bar">
        <div className="row row--padded row--short flex-container--row flex-container--space-between-center">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="24px" viewBox="0 0 80 31" enable-background="new 0 0 80 31" xml:space="preserve" className="nav-bar-logo">
            <a href="/">
            <title>Logo</title>
            <desc>Spee.ch logo</desc>
            <g id="About">
                <g id="Publish-Form-V2-_x28_filled_x29_" transform="translate(-42.000000, -23.000000)">
                    <g id="Group-17" transform="translate(42.000000, 22.000000)">
                        <text transform="matrix(1 0 0 1 0 20)" font-size="25" font-family="Roboto">Spee&lt;h</text>
                        <g id="Group-16" transform="translate(0.000000, 30.000000)">
                            <path id="Line-8" fill="none" stroke="#09F911" stroke-width="1" stroke-linecap="square" d="M0.5,1.5h15"/>
                            <path id="Line-8-Copy" fill="none" stroke="#029D74" stroke-width="1" stroke-linecap="square" d="M16.5,1.5h15"/>
                            <path id="Line-8-Copy-2" fill="none" stroke="#E35BD8" stroke-width="1" stroke-linecap="square" d="M32.5,1.5h15"/>
                            <path id="Line-8-Copy-3" fill="none" stroke="#4156C5" stroke-width="1" stroke-linecap="square" d="M48.5,1.5h15"/>
                            <path id="Line-8-Copy-4" fill="none" stroke="#635688" stroke-width="1" stroke-linecap="square" d="M64.5,1.5h15"/>
                        </g>
                    </g>
                </g>
            </g>
            </a>
        </svg>
          <div className="nav-bar--center">
            <span className="nav-bar-tagline">Open-source, decentralized image and video sharing.</span>
          </div>
          <div className="nav-bar--right">
            <a className="nav-bar-link link--nav" href="/">Publish</a>
            <a className="nav-bar-link link--nav" href="/about">About</a>
            { this.props.loggedInChannelName ? (
              <select type="text" id="nav-bar-channel-select" className="select select--arrow link--nav" onchange={this.handleSelection}>
                <option id="nav-bar-channel-select-channel-option">@{this.props.loggedInChannelName}</option>
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
