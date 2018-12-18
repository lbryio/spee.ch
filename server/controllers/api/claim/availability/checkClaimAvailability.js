const chainquery = require('chainquery').default;
const { publishing: { primaryClaimAddress, additionalClaimAddresses } } = require('@config/siteConfig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const claimAvailability = async (name) => {
  const claimAddresses = additionalClaimAddresses || [];
  claimAddresses.push(primaryClaimAddress);
  // find any records where the name is used
  return chainquery.claim
    .findAll({
      attributes: ['claim_address'],
      where     : {
        name,
        claim_address: {
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
