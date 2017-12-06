const logger = require('winston');
// const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

module.exports = {
  serveFile ({ filePath, fileType }, claimId, name, res) {
    logger.verbose(`serving ${name}#${claimId}`);
    // set response options
    const headerContentType = fileType || 'image/jpeg';
    const options = {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Content-Type'          : headerContentType,
      },
    };
    // send the file
    res.status(200).sendFile(filePath, options);
  },
  showFile (claimInfo, shortId, res) {
    const openGraphInfo = module.exports.createOpenGraphInfo(claimInfo);
    res.status(200).render('show', { layout: 'show', claimInfo, shortId, openGraphInfo });
  },
  showFileLite (claimInfo, shortId, res) {
    const openGraphInfo = module.exports.createOpenGraphInfo(claimInfo);
    res.status(200).render('showLite', { layout: 'showlite', claimInfo, shortId, openGraphInfo });
  },
};
