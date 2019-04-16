import { resolveUri } from 'server/lbrynet/index';
import { handleErrorResponse } from '../../../utils/errorHandlers.js';

/*

  route to run a resolve request on the daemon

*/

const claimResolve = ({ headers, ip, originalUrl, params }, res) => {
  resolveUri(`${params.name}#${params.claimId}`)
    .then(resolvedUri => {
      res.status(200).json(resolvedUri);
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

export default claimResolve;
