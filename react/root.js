import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withAnalytics from 'utils/googleAnalytics';

import PublishPage from 'components/PublishPage';
import AboutPage from 'components/AboutPage';
import LoginPage from 'containers/LoginPage';
import ShowPage from 'containers/ShowPage';
import FourOhFourPage from 'components/FourOhFourPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={withAnalytics(PublishPage)} />
        <Route exact path="/about" component={withAnalytics(AboutPage)} />
        <Route exact path="/login" component={withAnalytics(LoginPage)} />
        <Route exact path="/:identifier/:claim" component={withAnalytics(ShowPage)} />
        <Route exact path="/:claim" component={withAnalytics(ShowPage)} />
        <Route component={withAnalytics(FourOhFourPage)} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
