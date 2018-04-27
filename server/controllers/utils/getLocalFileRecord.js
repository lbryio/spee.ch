const db = require('../../models');

const NO_FILE = 'NO_FILE';

const getLocalFileRecord = (claimId, name) => {
  return db.File.findOne({where: {claimId, name}})
    .then(file => {
      if (!file) {
        return NO_FILE;
      }
      return file.dataValues;
    });
};

module.exports = getLocalFileRecord;
