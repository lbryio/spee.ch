import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GAListener from 'components/GAListener';
import PublishPage from 'components/PublishPage';
import AboutPage from 'components/AboutPage';
import LoginPage from 'containers/LoginPage';
import ShowPage from 'containers/ShowPage';
import FourOhFourPage from 'components/FourOhFourPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <GAListener>
        <Switch>
          <Route exact path="/" component={PublishPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/:identifier/:claim" component={ShowPage} />
          <Route exact path="/:claim" component={ShowPage} />
          <Route component={FourOhFourPage} />
        </Switch>
      </GAListener>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
