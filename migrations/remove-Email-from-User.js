module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    return queryInterface.removeColumn(
      'User',
      'Email'
    );
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.addColumn(
      'User',
      'Email',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
  },
};
