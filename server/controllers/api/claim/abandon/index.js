const logger = require('winston');
const db = require('../../../../models');
const { abandonClaim } = require('../../../../lbrynet');
const deleteFile = require('../publish/deleteFile.js');
const authenticateUser = require('../publish/authentication.js');

/*
  route to abandon a claim through the daemon
*/

const claimAbandon = async (req, res) => {
  const {claimId} = req.body;
  const {user} = req;
  try {
    const [channel, claim] = await Promise.all([
      authenticateUser(user.channelName, null, null, user),
      db.Claim.findOne({where: {claimId}}),
    ]);

    if (!claim) throw new Error('That channel does not exist');
    if (!channel.channelName) throw new Error('You don\'t own this channel');

    await abandonClaim({claimId});
    const file = await db.File.findOne({where: {claimId}});
    await Promise.all([
      deleteFile(file.filePath),
      db.File.destroy({where: {claimId}}),
      db.Claim.destroy({where: {claimId}}),
    ]);
    logger.debug(`Claim abandoned: ${claimId}`);
    res.status(200).json({
      success: true,
      message: `Claim with id ${claimId} abandonded`,
    });
  } catch (error) {
    logger.error('abandon claim error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = claimAbandon;
