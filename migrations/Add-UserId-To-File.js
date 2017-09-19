module.exports = {
  up: (queryInterface, Sequelize) => {
      // logic for transforming into the new state
    return queryInterface.addColumn(
      'File',
      'UserId',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'File',
      'UserId'
    );
  },
};
