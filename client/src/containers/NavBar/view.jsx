import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Logo from '@components/Logo';
import NavBarChannelDropdown from '@components/NavBarChannelOptionsDropdown';

const VIEW = 'VIEW';
const LOGOUT = 'LOGOUT';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentDidMount () {
    this.props.checkForLoggedInChannel();
  }
  handleSelection (event) {
    const value = event.target.selectedOptions[0].value;
    switch (value) {
      case LOGOUT:
        this.props.logOutChannel();
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
    const { siteDescription } =  this.props;
    return (
      <div className='row row--wide nav-bar'>
        <div className='row row--padded row--short flex-container--row flex-container--space-between-center'>
          <Logo />
          <div className='nav-bar--center'>
            <span className='nav-bar-tagline'>{siteDescription}</span>
          </div>
          <div className='nav-bar--right'>
            <NavLink className='nav-bar-link link--nav' activeClassName='link--nav-active' to='/' exact>Publish</NavLink>
            <NavLink className='nav-bar-link link--nav'  activeClassName='link--nav-active' to='/about'>About</NavLink>
            { this.props.channelName ? (
              <NavBarChannelDropdown
                channelName={this.props.channelName}
                handleSelection={this.handleSelection}
                defaultSelection={this.props.channelName}
                VIEW={VIEW}
                LOGOUT={LOGOUT}
              />
            ) : (
              <NavLink id='nav-bar-login-link' className='nav-bar-link link--nav' activeClassName='link--nav-active' to='/login'>Channel</NavLink>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
