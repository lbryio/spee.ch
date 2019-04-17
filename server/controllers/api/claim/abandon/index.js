import logger from 'winston';
import db from 'server/models';
import chainquery from 'chainquery';
import { abandonClaim } from 'server/lbrynet';
import deleteFile from '../publish/deleteFile.js';
import authenticateUser from '../publish/authentication.js';

/*
  route to abandon a claim through the daemon
  DO AFTER THE REST WORKS
*/

const claimAbandon = async (req, res) => {
  const { claimId } = req.body;
  const { user } = req;
  try {
    // This must not depend on db.Claim
    const [channel, claim] = await Promise.all([
      authenticateUser(user.channelName, null, null, user),
      chainquery.claim.queries.resolveClaim(claimId),
    ]);

    if (!claim) throw new Error('That claim does not exist');
    if (!channel.channelName) throw new Error("You don't own this channel");

    await abandonClaim({ claimId });
    // Add file_delete here.
    // Using db.File just to get the path. Use file_list.
    const file = await db.File.findOne({ where: { claimId } });
    await Promise.all([
      deleteFile(file.filePath),
      db.File.destroy({ where: { claimId } }),
      // Remove this
      db.Claim.destroy({ where: { claimId } }),
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

export default claimAbandon;
