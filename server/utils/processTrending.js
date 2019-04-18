const db = require('server/models');
const {
  getInformationFromValues,
  getZScore,
  getFastPValue,
  getWeight,
} = require('server/models/utils/trendingAnalysis');

const logger = require('winston');

module.exports = async () => {
  try {
    const claims = await db.Trending.getTrendingClaims();
    const claimViews = await db.Views.getUniqueViews();

    if (claimViews.length <= 1) {
      return;
    }

    const time = Date.now();

    // Must create statistical analytics before we can process zScores, etc
    const viewsNumArray = claimViews.map((claimViewsEntry) => claimViewsEntry.views);
    const {
      mean,
      standardDeviation,
    } = getInformationFromValues(viewsNumArray);

    for (let i = 0; i < claimViews.length; i++) {
      let claimViewsEntry = claimViews[i];

      const {
        isChannel,
        claimId,
        publisherId,
      } = claimViewsEntry;

      const zScore = getZScore(claimViewsEntry.views, mean, standardDeviation);
      const pValue = getFastPValue(zScore);
      const weight = getWeight(zScore, pValue);

      const trendingData = {
        time,
        isChannel    : claimViewsEntry.isChannel,
        claimId      : claimViewsEntry.claimId,
        publisherId  : claimViewsEntry.publisherId,
        intervalViews: claimViewsEntry.views,
        weight,
        zScore,
        pValue,
      };

      db.Trending.create(trendingData);
    }
  } catch (e) {
    logger.error('Error processing trending content:', e);
  }
};
