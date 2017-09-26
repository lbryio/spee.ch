module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const p1 = queryInterface.removeColumn(
      'Certificate',
      'UserId'
    );
    const p2 = queryInterface.addColumn(
      'Certificate',
      'ChannelId',
      {
        type     : Sequelize.INTEGER,
        allowNull: true,
      }
    );
    const p3 = queryInterface.addConstraint(
      'Certificate',
      ['ChannelId'],
      {
        type      : 'FOREIGN KEY',
        name      : 'Certificate_ibfk_1',
        references: {
          table: 'Channel',
          field: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    );
    const p4 = queryInterface.changeColumn(
      'Claim',
      'FileId',
      {
        type     : Sequelize.INTEGER,
        allowNull: true,
      }
    );
    const p5 = queryInterface.addConstraint(
      'Claim',
      ['FileId'],
      {
        type      : 'FOREIGN KEY',
        name      : 'Claim_ibfk_1',
        references: {
          table: 'File',
          field: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    );
    const p6 = queryInterface.removeColumn(
      'File',
      'UserId'
    );

    return Promise.all([p1, p2, p3, p4, p5, p6]);
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const p1 = queryInterface.addColumn(
      'Certificate',
      'UserId',
      {
        type     : Sequelize.INTEGER,
        allowNull: true,
      }
    );
    const p2 = queryInterface.addColumn(
      'File',
      'UserId',
      {
        type     : Sequelize.INTEGER,
        allowNull: true,
      }
    );
    return Promise.all([p1, p2]);
  },
};
