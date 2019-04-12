export default (sequelize, { BOOLEAN, DATE, STRING }) => {
  const Metrics = sequelize.define(
    'Metrics',
    {
      time: {
        type: DATE(6),
        defaultValue: sequelize.NOW,
      },
      isInternal: {
        type: BOOLEAN,
      },
      isChannel: {
        type: BOOLEAN,
        defaultValue: false,
      },
      claimId: {
        type: STRING,
        defaultValue: null,
      },
      ip: {
        type: STRING,
        defaultValue: null,
      },
      request: {
        type: STRING,
        defaultValue: null,
      },
      userAgent: {
        type: STRING,
        defaultValue: null,
      },
      referrer: {
        type: STRING,
        defaultValue: null,
      },
      routePath: {
        type: STRING,
        defaultValue: null,
      },
      params: {
        type: STRING,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
      timestamps: false, // don't use default timestamps columns
      indexes: [
        {
          fields: ['isInternal', 'isChannel', 'time', 'claimId', 'routePath'],
        },
      ],
    }
  );

  return Metrics;
};
