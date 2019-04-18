const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const getClaimData = require('server/utils/getClaimData');
const fetchClaimData = require('server/utils/fetchClaimData');
const logger = require('winston');
/*

  route to return data for a claim

*/

const claimData = async ({ ip, originalUrl, body, params }, res) => {
  try {
    const resolvedClaim = await fetchClaimData(params);

    if (!resolvedClaim) {
      return res.status(404).json({
        success: false,
        message: 'No claim could be found',
      });
    }

    res.status(200).json({
      success: true,
      data: await getClaimData(resolvedClaim),
    });
  } catch (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

module.exports = claimData;
