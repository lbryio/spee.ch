const handlePageRequest = require('../../controllers/pages/sendReactApp');

module.exports = {
  '*': { controller: handlePageRequest, action: 'fallback' },
};
