import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'components/HomePage';
import AboutPage from 'components/AboutPage';
import LoginPage from 'containers/LoginPage';
import ShowPage from 'containers/ShowPage';
import FourOhFourPage from 'components/FourOhFourPage';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/:identifier/:claim' component={ShowPage} />
      <Route exact path='/:claim' component={ShowPage} />
      <Route component={FourOhFourPage} />
    </Switch>
  );
};

export default App;
