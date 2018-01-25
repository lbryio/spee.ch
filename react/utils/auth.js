import {makeGetRequest} from 'utils/xhr';

module.exports = {
  authenticateUser () {
    // send request to server & receive the user info back
    return makeGetRequest('/user');
  },
};
