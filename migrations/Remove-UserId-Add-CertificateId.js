module.exports = {
  up: (queryInterface, Sequelize) => {
      // logic for transforming into the new state
    const p1 = queryInterface.addColumn(
      'User',
      'CertificateId',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    const p2 = queryInterface.removeColumn(
      'Certificate',
      'UserId'
    );
    return Promise.all([p1, p2]);
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const p1 = queryInterface.removeColumn(
      'User',
      'CertificateId'
    );
    const p2 = queryInterface.addColumn(
      'Certificate',
      'UserId',
      {
        type     : Sequelize.STRING,
        allowNull: true,
      }
    );
    return Promise.all([p1, p2]);
  },
};
