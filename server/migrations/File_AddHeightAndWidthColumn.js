module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const changeOne = queryInterface.addColumn(
      'File',
      'height',
      {
        type     : Sequelize.INTEGER,
        allowNull: false,
      }
    );
    const changeTwo = queryInterface.addColumn(
      'File',
      'width',
      {
        type     : Sequelize.INTEGER,
        allowNull: false,
      }
    );
    return Promise.all([changeOne, changeTwo]);
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    const reversionOne = queryInterface.removeColumn(
      'File',
      'height'
    );
    const reversionTwo = queryInterface.removeColumn(
      'File',
      'width',
    );
    return Promise.all([reversionOne, reversionTwo]);
  },
};
