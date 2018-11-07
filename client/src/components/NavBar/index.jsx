import React from 'react';
import SpaceBetween from '@components/SpaceBetween';
import Logo from '@components/Logo';
import SiteDescription from '@containers/SiteDescription';
import NavigationLinks from '@containers/NavigationLinks';

class NavBar extends React.Component {
  render () {
    return (
      <div className={'nav-bar'}>
        <SpaceBetween >
          <Logo />
          <NavigationLinks />
        </SpaceBetween>
      </div>
    );
  }
}

export default NavBar;
