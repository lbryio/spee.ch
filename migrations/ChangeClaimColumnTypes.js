module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const p1 = queryInterface.changeColumn(
      'Claim',
      'amount',
      {
        type     : Sequelize.DECIMAL(19, 8),
        allowNull: true,
      }
    );
    const p2 = queryInterface.changeColumn(
      'Claim',
      'effectiveAmount',
      {
        type     : Sequelize.DECIMAL(19, 8),
        allowNull: true,
      }
    );
    return Promise.all([p1, p2]);
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const p1 = queryInterface.changeColumn(
      'Claim',
      'amount',
      {
        type     : Sequelize.DOUBLE,
        allowNull: true,
      }
    );
    const p2 = queryInterface.changeColumn(
      'Claim',
      'effectiveAmount',
      {
        type     : Sequelize.DOUBLE,
        allowNull: true,
      }
    );
    return Promise.all([p1, p2]);
  },
};
