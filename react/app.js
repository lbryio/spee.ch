import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

const App = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index}{...route} />
      ))}
    </Switch>
  );
};

export default App;
