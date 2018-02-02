import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PublishPage from 'components/PublishPage';
import AboutPage from 'components/AboutPage';
import LoginPage from 'containers/LoginPage';
import ShowPage from 'containers/ShowPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PublishPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/:identifier/:claim" component={ShowPage} />
        <Route exact path="/:claim/" component={ShowPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
