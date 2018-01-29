import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PublishPage from 'components/PublishPage';
import AboutPage from 'components/AboutPage';
import LoginPage from 'components/LoginPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={PublishPage} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
