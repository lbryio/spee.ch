// load dependencies
import logger from 'winston';
import db from 'server/models';
require('../helpers/configureLogger.js')(logger);

let totalClaims = 0;
let totalClaimsNoCertificate = 0;

db.sequelize
  .sync() // sync sequelize
  .then(() => {
    logger.info('finding claims with no channels');
    return db.Claim.findAll({
      where: {
        channelName: null,
        certificateId: {
          $ne: null,
        },
      },
    });
  })
  .then(claimsArray => {
    totalClaims = claimsArray.length;
    const claimsUpdatePromises = claimsArray.map(claim => {
      return db.Certificate.findOne({
        where: { claimId: claim.get('certificateId') },
      })
        .then(certificate => {
          // if a certificate is found...
          if (certificate) {
            logger.debug('certificate found');
            // update the claim's channel name with the certificate's name
            return claim
              .update({
                channelName: certificate.get('name'),
              })
              .then(() => {})
              .catch(error => logger.error(error));
          }
          logger.warn('no record found for certificate: ', claim.get('certificateId'));
          totalClaimsNoCertificate += 1;
        })
        .catch(error => logger.error(error));
    });
    return Promise.all(claimsUpdatePromises);
  })
  .then(() => {
    logger.info('total claims found', totalClaims);
    logger.info('total claims found with no matching certificate record', totalClaimsNoCertificate);
    logger.debug('all done');
  })
  .catch(error => {
    logger.error(error);
  });
