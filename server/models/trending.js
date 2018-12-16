const chainquery = require('chainquery').default;

module.exports = (sequelize, { BOOLEAN, DATE, FLOAT, INTEGER, STRING }) => {
  const Trending = sequelize.define(
    'Trending',
    {
      time: { /* TODO: Historical analysis and log roll */
        type        : DATE(6),
        defaultValue: sequelize.NOW,
      },
      isChannel: {
        type        : BOOLEAN,
        defaultValue: false,
      },
      claimId: {
        type        : STRING,
        defaultValue: null,
      },
      publisherId: {
        type        : STRING,
        defaultValue: null,
      },
      intervalViews: {
        type        : INTEGER,
        defaultValue: 0,
      },
      weight: {
        type        : FLOAT,
        defaultValue: 0,
      },
      zScore: {
        type        : FLOAT,
        defaultValue: 0,
      },
      pValue: {
        type        : FLOAT,
        defaultValue: 0,
      },
      // TODO: Calculate t-statistics
    },
    {
      freezeTableName: true,
      timestamps     : false, // don't use default timestamps columns
      indexes        : [
        {
          fields: ['claimId'],
        },
        {
          fields: ['time', 'isChannel', 'claimId', 'publisherId', 'weight'],
        },
      ],
    }
  );

  Trending.getTrendingWeightData = async ({
    hours = 2,
    minutes = 0,
    limit = 20,
  } = {}) => {
    let time = new Date();
    time.setHours(time.getHours() - hours);
    time.setMinutes(time.getMinutes() - minutes);

    const sqlTime = time.toISOString().slice(0, 19).replace('T', ' ');

    const selectString = 'DISTINCT(claimId), weight';
    const whereString = `isChannel = false and time > '${sqlTime}'`;
    const query = `SELECT ${selectString} FROM Trending WHERE ${whereString} ORDER BY weight DESC LIMIT ${limit}`;

    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  };

  Trending.getTrendingClaims = async () => {
    const trendingWeightData = await Trending.getTrendingWeightData();

    const trendingClaimIds = [];
    const trendingClaims = trendingWeightData.reduce((claims, trendingData) => {
      trendingClaimIds.push(trendingData.claimId);
      claims[trendingData.claimId] = {
        ...trendingData,
      };

      return claims;
    }, {});

    const claimData = await chainquery.claim.findAll({
      where: {
        claim_id: { [sequelize.Op.in]: trendingClaimIds },
      },
    });

    return claimData.map((claimData) => {
      return Object.assign(trendingClaims[claimData.claim_id], claimData.dataValues);
    });
  };

  return Trending;
};
