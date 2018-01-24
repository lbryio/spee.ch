import {makeGetRequest} from 'utils/xhr';

module.exports = {
  authenticateUser () {
    // send authentication request to server
    // receive the user info back
    return makeGetRequest('/user');
  },
};
