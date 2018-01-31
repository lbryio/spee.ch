import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Logo from 'components/Logo';
import NavBarChannelDropdown from 'components/NavBarChannelOptionsDropdown';
import request from 'utils/request';

const VIEW = 'VIEW';
const LOGOUT = 'LOGOUT';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.checkForLoggedInUser = this.checkForLoggedInUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentDidMount () {
    // check to see if the user is already logged in
    this.checkForLoggedInUser();
  }
  checkForLoggedInUser () {
    // check for whether a channel is already logged in
    const params = {
      credentials: 'include',
    }
    request('/user', params)
      .then(({success, message}) => {
        if (success) {
          this.props.onChannelLogin(message.channelName, message.shortChannelId, message.channelClaimId);
        } else {
          console.log('user was not logged in');
        }
      })
      .catch(error => {
        console.log('authenticate user errored:', error);
      });
  }
  logoutUser () {
    // send logout request to server
    window.location.href = '/logout'; // NOTE: replace with a call to the server
  }
  handleSelection (event) {
    console.log('handling selection', event);
    const value = event.target.selectedOptions[0].value;
    console.log('value', value);
    switch (value) {
      case LOGOUT:
        this.logoutUser();
        break;
      case VIEW:
        // redirect to channel page
        this.props.history.push(`/${this.props.channelName}:${this.props.channelLongId}`);
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
            <NavLink className="nav-bar-link link--nav" activeClassName="link--nav-active" to="/" exact={true}>Publish</NavLink>
            <NavLink className="nav-bar-link link--nav"  activeClassName="link--nav-active" to="/about">About</NavLink>
            { this.props.channelName ? (
              <NavBarChannelDropdown
                channelName={this.props.channelName}
                handleSelection={this.handleSelection}
                VIEW={VIEW}
                LOGOUT={LOGOUT}
              />
            ) : (
              <NavLink id="nav-bar-login-link" className="nav-bar-link link--nav" activeClassName="link--nav-active" to="/login">Channel</NavLink>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
