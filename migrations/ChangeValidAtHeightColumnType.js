module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const p1 = queryInterface.changeColumn(
      'Claim',
      'validAtHeight',
      {
        type     : Sequelize.INTEGER,
        allowNull: true,
      }
    );
    return Promise.all([p1]);
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const p1 = queryInterface.changeColumn(
      'Claim',
      'validAtHeight',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    return Promise.all([p1]);
  },
};
