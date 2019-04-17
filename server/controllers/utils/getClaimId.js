import logger from 'winston';
import db from 'server/models';
import chainquery from 'chainquery';
import publishCache from 'server/utils/publishCache';
import createCanonicalLink from '@globalutils/createCanonicalLink';

const getClaimIdByChannel = async (channelName, channelClaimId, claimName) => {
  logger.debug(`getClaimIdByChannel(${channelName}, ${channelClaimId}, ${claimName})`);
  const canonicalUrl = createCanonicalLink({
    asset: { channelName, channelShortId: channelClaimId, name: claimName },
  });
  let channelId = await chainquery.claim.queries.getLongClaimId(channelName, channelClaimId);

  if (channelId === null) {
    channelId = await db.Certificate.getLongChannelId(channelName, channelClaimId);
  }

  const claimId = publishCache.get(canonicalUrl)
    ? publishCache.get(canonicalUrl)
    : await chainquery.claim.queries.getClaimIdByLongChannelId(channelId, claimName);
  // TODO: Revisit with sdk-provided partialIds
  logger.debug(`getClaimIdByChannel returns`, claimId);
  return claimId;
};

const getClaimId = async (channelName, channelClaimId, name, claimId) => {
  logger.debug(`getClaimId: ${channelName}, ${channelClaimId}, ${name}, ${claimId})`);
  if (channelName) {
    return getClaimIdByChannel(channelName, channelClaimId, name);
  } else {
    const canonicalUrl = createCanonicalLink({ asset: { name: name, claimId } });
    let claimIdResult = publishCache.get(canonicalUrl)
      ? publishCache.get(canonicalUrl)
      : await chainquery.claim.queries.getLongClaimId(name, claimId);
    return claimIdResult;
  }
};

export default getClaimId;
