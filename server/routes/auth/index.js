const speechPassport = require('../../speechPassport');
const handleSignupRequest = require('../../controllers/auth/signup');
const handleLoginRequest = require('../../controllers/auth/login');
const handleLogoutRequest = require('../../controllers/auth/logout');
const handleUserRequest = require('../../controllers/auth/user');

module.exports = (app) => {
  app.post('/signup', speechPassport.authenticate('local-signup'), handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.get('/logout', handleLogoutRequest);
  app.get('/user', handleUserRequest);
};
