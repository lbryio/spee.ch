module.exports = (sequelize, { BOOLEAN, DATE, STRING }) => {
  const Views = sequelize.define(
    'Views',
    {
      time: {
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
      ip: {
        type        : STRING,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
      timestamps     : false, // don't use default timestamps columns
      indexes        : [
        {
          fields: ['time', 'isChannel', 'claimId', 'publisherId', 'ip'],
        },
      ],
    }
  );

  Views.getUniqueViews = ({
    hours = 0,
    minutes = 30,
  } = {}) => {
    let time = new Date();
    time.setHours(time.getHours() - hours);
    time.setMinutes(time.getMinutes() - minutes);

    const sqlTime = time.toISOString().slice(0, 19).replace('T', ' ');

    const selectString = 'claimId, publisherId, isChannel, COUNT(DISTINCT ip) as views';
    const groupString = 'claimId, publisherId, isChannel';

    return sequelize.query(
      `SELECT ${selectString} FROM Views WHERE time > '${sqlTime}' GROUP BY ${groupString}`,
      { type: sequelize.QueryTypes.SELECT }
    );
  };

  Views.getGetUniqueViewsbByClaimId = (claimId) => {
    return Views.count({
      where: {
        claimId,
      },
      distinct: true,
      col     : 'ip',
    });
  };

  return Views;
};
