module.exports = {
  up: (queryInterface, Sequelize) => {
      // logic for transforming into the new state
    queryInterface.addColumn(
      'Certificate',
      'UserId',
      {
        type     : Sequelize.STRING,
        allowNull: false,
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    queryInterface.removeColumn(
      'Certificate',
      'UserId'
    );
  },
};
