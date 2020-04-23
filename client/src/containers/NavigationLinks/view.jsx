import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NavBarChannelOptionsDropdown from '@components/NavBarChannelOptionsDropdown';
import createCanonicalLink from '@globalutils/createCanonicalLink';

const VIEW = 'VIEW';
const LOGOUT = 'LOGOUT';

class NavigationLinks extends React.Component {
  constructor (props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentDidMount () {
    this.props.checkForLoggedInChannel();
  }
  handleSelection (event) {
    const { history, channelName: name, channelShortId: shortId } = this.props;
    const value = event.target.selectedOptions[0].value;
    switch (value) {
      case LOGOUT:
        this.props.logOutChannel();
        break;
      case VIEW:
        // redirect to channel page
        history.push(createCanonicalLink({ channel: { name, shortId } }));
        break;
      default:
        break;
    }
  }
  render () {
    const { channelName, showPublish, closedRegistration } = this.props;
    return (
      <div className='navigation-links'>
        {/*{showPublish && <NavLink*/}
        {/*  className='nav-bar-link link--nav'*/}
        {/*  activeClassName='link--nav-active'*/}
        {/*  to='/'*/}
        {/*  exact*/}
        {/*>*/}
        {/*  Publish*/}
        {/*</NavLink>}*/}
        <NavLink
          className='nav-bar-link link--nav'
          activeClassName='link--nav-active'
          to='/about'
        >
          About
        </NavLink>
        {/*{ channelName ? (*/}
        {/*  <NavBarChannelOptionsDropdown*/}
        {/*    channelName={this.props.channelName}*/}
        {/*    handleSelection={this.handleSelection}*/}
        {/*    defaultSelection={this.props.channelName}*/}
        {/*    VIEW={VIEW}*/}
        {/*    LOGOUT={LOGOUT}*/}
        {/*  />*/}
        {/*) : !closedRegistration && (*/}
        {/*  <NavLink*/}
        {/*    id='nav-bar-login-link'*/}
        {/*    className='nav-bar-link link--nav'*/}
        {/*    activeClassName='link--nav-active'*/}
        {/*    to='/login'*/}
        {/*  >*/}
        {/*    Channel*/}
        {/*  </NavLink>*/}
        {/*)}*/}
      </div>
    );
  }
}

export default withRouter(NavigationLinks);
