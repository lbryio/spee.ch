module.exports = (sequelize, { STRING, BOOLEAN, INTEGER, TEXT, ARRAY, DECIMAL, DOUBLE }) => {
  const Claim = sequelize.define(
    'Claim',
    {
      address: {
        type     : STRING,
        allowNull: false,
      },
      amount: {
        type     : STRING,
        allowNull: false,
      },
      claimId: {
        type     : STRING,
        allowNull: false,
      },
      claimSequence: {
        type     : INTEGER,
        allowNull: false,
      },
      decodedClaim: {
        type     : BOOLEAN,
        allowNull: false,
      },
      depth: {
        type     : INTEGER,
        allowNull: false,
      },
      effectiveAmount: {
        type     : STRING,
        allowNull: false,
      },
      hasSignature: {
        type   : BOOLEAN,
        default: false,
      },
      height: {
        type   : STRING,
        default: '0',
      },
      hex: {
        type     : TEXT('long'),
        allowNull: false,
      },
      name: {
        type     : STRING,
        allowNull: false,
      },
      nout: {
        type     : INTEGER,
        allowNull: false,
      },
      txid: {
        type     : STRING,
        allowNull: false,
      },
      validAtHeight: {
        type   : STRING,
        default: null,
      },
      outpoint: {
        type     : STRING,
        allowNull: false,
      },
      claimType: {
        type     : STRING,
        allowNull: false,
      },
      author: {
        type   : STRING,
        default: null,
      },
      description: {
        type   : STRING,
        default: null,
      },
      language: {
        type   : STRING,
        default: null,
      },
      licenseUrl: {
        type   : STRING,
        default: null,
      },
      nsfw: {
        type   : BOOLEAN,
        default: null,
      },
      preview: {
        type   : STRING,
        default: null,
      },
      thumbnail: {
        type   : STRING,
        default: null,
      },
      title: {
        type   : STRING,
        default: null,
      },
      metadataVersion: {
        type   : STRING,
        default: null,
      },
      contentType: {
        type   : STRING,
        default: null,
      },
      source: {
        type   : STRING,
        default: null,
      },
      sourceType: {
        type   : STRING,
        default: null,
      },
      sourceVersion: {
        type   : STRING,
        default: null,
      },
      streamVersion: {
        type   : STRING,
        default: null,
      },
      valueVersion: {
        type   : STRING,
        default: null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Claim;
};
