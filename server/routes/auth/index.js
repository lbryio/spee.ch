import speechPassport from '../../speechPassport';
import handleSignupRequest from '../../controllers/auth/signup';
import handleLoginRequest from '../../controllers/auth/login';
import handleLogoutRequest from '../../controllers/auth/logout';
import handleUserRequest from '../../controllers/auth/user';

export default {
  '/signup': {
    method: 'post',
    controller: [speechPassport.authenticate('local-signup'), handleSignupRequest],
  },
  '/auth': { method: 'post', controller: handleLoginRequest },
  '/logout': { controller: handleLogoutRequest },
  '/user': { controller: handleUserRequest },
};
