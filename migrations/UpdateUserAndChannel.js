module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const p1 = queryInterface.addColumn(
      'User',
      'userName',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    const p2 = queryInterface.removeColumn(
          'User',
          'channelName'
    );
    const p3 = queryInterface.removeColumn(
          'User',
          'channelClaimId'
    );
    return Promise.all([p1, p2, p3]);
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const p1 = queryInterface.removeColumn(
          'User',
          'userName'
    );
    const p2 = queryInterface.addColumn(
      'User',
      'channelName',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    const p3 = queryInterface.addColumn(
      'User',
      'channelClaimId',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    return Promise.all([p1, p2, p3]);
  },
};
