const logger = require('winston');
const db = require('server/models');
const { abandonClaim } = require('server/lbrynet');
const deleteFile = require('../publish/deleteFile.js');
const authenticateUser = require('../publish/authentication.js');

/*
  route to abandon a claim through the daemon
*/

const claimAbandon = async (req, res) => {
  const { outpoint } = req.body;
  const { user } = req;
  try {
    const [channel, claim] = await Promise.all([
      authenticateUser(user.channelName, null, null, user),
      db.Claim.findOne({ where: { outpoint } }),
    ]);

    if (!claim) throw new Error('That channel does not exist');
    if (!channel.channelName) throw new Error("You don't own this channel");

    await abandonClaim({ outpoint });
    const file = await db.File.findOne({ where: { outpoint } });
    await Promise.all([
      deleteFile(file.filePath),
      db.File.destroy({ where: { outpoint } }),
      db.Claim.destroy({ where: { outpoint } }),
    ]);
    logger.debug(`Claim abandoned: ${outpoint}`);
    res.status(200).json({
      success: true,
      message: `Claim with outpoint ${outpoint} abandonded`,
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
