module.exports = {
  up: (queryInterface, { INTEGER }) => {
    // logic for transforming into the new state
    return Promise.all([
      queryInterface.addColumn(
        'File',
        'fileHeight',
        {
          type     : INTEGER,
          allowNull: false,
          default  : 0,
        }
      ),
      queryInterface.addColumn(
        'File',
        'fileWidth',
        {
          type     : INTEGER,
          allowNull: false,
          default  : 0,
        }
      ),
      queryInterface.removeColumn(
        'File',
        'address',
      ),
      queryInterface.removeColumn(
        'File',
        'height',
      ),
      queryInterface.removeColumn(
        'File',
        'nsfw',
      ),
      queryInterface.removeColumn(
        'File',
        'trendingEligible',
      ),
    ]);
  },
  down: (queryInterface, { BOOLEAN, INTEGER, STRING }) => {
    return Promise.all([
      queryInterface.removeColumn(
        'File',
        'fileHeight',
      ),
      queryInterface.removeColumn(
        'File',
        'fileWidth',
      ),
      queryInterface.addColumn(
        'File',
        'address',
        {
          type     : STRING,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'File',
        'height',
        {
          type     : INTEGER,
          allowNull: false,
          default  : 0,
        }
      ),
      queryInterface.addColumn(
        'File',
        'nsfw',
        {
          type        : BOOLEAN,
          allowNull   : false,
          defaultValue: false,
        }
      ),
      queryInterface.addColumn(
        'File',
        'trendingEligible',
        {
          type        : BOOLEAN,
          allowNull   : false,
          defaultValue: true,
        }
      ),
    ]);
  },
};
