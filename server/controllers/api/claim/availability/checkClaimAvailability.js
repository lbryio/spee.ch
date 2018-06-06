const db = require('../../../../models');
const { publishing: { primaryClaimAddress, additionalClaimAddresses } } = require('@config/siteConfig.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const claimAvailability = (name) => {
  const claimAddresses = additionalClaimAddresses || [];
  claimAddresses.push(primaryClaimAddress);
  // find any records where the name is used
  return db.Claim
    .findAll({
      attributes: ['address'],
      where     : {
        name,
        address: {
          [Op.or]: claimAddresses,
        },
      },
    })
    .then(result => {
      return (result.length <= 0);
    })
    .catch(error => {
      throw error;
    });
};

module.exports = claimAvailability;
