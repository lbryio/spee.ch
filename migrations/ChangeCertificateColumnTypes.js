module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const p1 = queryInterface.changeColumn(
      'Certificate',
      'amount',
      {
        type     : Sequelize.DOUBLE,
        allowNull: true,
      }
    );
    const p2 = queryInterface.changeColumn(
      'Certificate',
      'effectiveAmount',
      {
        type     : Sequelize.DOUBLE,
        allowNull: true,
      }
    );
    const p3 = queryInterface.changeColumn(
      'Certificate',
      'height',
      {
        type     : Sequelize.INTEGER,
        allowNull: true,
      }
    );
    const p4 = queryInterface.changeColumn(
      'Certificate',
      'validAtHeight',
      {
        type     : Sequelize.INTEGER,
        allowNull: true,
      }
    );
    return Promise.all([p1, p2, p3, p4]);
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const p1 = queryInterface.changeColumn(
      'Certificate',
      'amount',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    const p2 = queryInterface.changeColumn(
      'Certificate',
      'effectiveAmount',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    const p3 = queryInterface.changeColumn(
      'Certificate',
      'height',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    const p4 = queryInterface.changeColumn(
      'Certificate',
      'validAtHeight',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    return Promise.all([p1, p2, p3, p4]);
  },
};
