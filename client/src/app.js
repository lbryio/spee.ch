import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage  from '@pages/HomePage';
import AboutPage from '@pages/AboutPage';
import LoginPage from '@pages/LoginPage';
import ShowPage from '@pages/ShowPage';
import FourOhFourPage from '@pages/FourOhFourPage';
import MultisitePage from '@pages/MultisitePage';

const customizedApp = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/multisite' component={MultisitePage} />
      <Route exact path='/:identifier/:claim' component={ShowPage} />
      <Route exact path='/:claim' component={ShowPage} />
      <Route component={FourOhFourPage} />
    </Switch>
  );
};

export default customizedApp;
