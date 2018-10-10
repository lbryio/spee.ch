const speechPassport = require('../../speechPassport');
const handleSignupRequest = require('../../controllers/auth/signup');
const handleLoginRequest = require('../../controllers/auth/login');
const handleLogoutRequest = require('../../controllers/auth/logout');
const handleUserRequest = require('../../controllers/auth/user');

module.exports = {
  '/signup': { method: 'post', controller: [ speechPassport.authenticate('local-signup'), handleSignupRequest ] },
  '/login': { method: 'post', controller: handleLoginRequest },
  '/logout': { controller: handleLogoutRequest },
  '/user': { controller: handleUserRequest },
};
