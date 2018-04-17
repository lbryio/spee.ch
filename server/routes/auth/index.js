const speechPassport = require('../speechPassport');
const handleSignupRequest = require('./signup');
const handleLoginRequest = require('./login');
const handleLogoutRequest = require('./logout');
const handleUserRequest = require('./user');

module.exports = (app) => {
  app.post('/signup', speechPassport.authenticate('local-signup'), handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.get('/logout', handleLogoutRequest);
  app.get('/user', handleUserRequest);
};
