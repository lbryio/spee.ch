import handlePageRequest from '../../controllers/pages/sendReactApp';

export default {
  '*': { controller: handlePageRequest, action: 'fallback' },
};
