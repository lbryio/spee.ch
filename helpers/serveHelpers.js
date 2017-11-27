const logger = require('winston');
// const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

module.exports = {
  serveFile ({ filePath }, { claimId, name, contentType }, res) {
    logger.verbose(`serving ${name}#${claimId}`);
    // set response options
    const headerContentType = contentType || 'image/jpeg';
    const options = {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Content-Type'          : headerContentType,
      },
    };
    // send the file
    if (filePath) {
      res.status(200).sendFile(filePath, options);
    } else {
      // res.status(307).redirect(`/api/get/${name}/${claimId}`);
      res.status(400).json({success: false, message: 'that claim is not hosted locally by Spee<ch yet'});
    }
  },
  showFile (claimInfo, shortId, res) {
    const openGraphInfo = module.exports.createOpenGraphInfo(claimInfo);
    res.status(200).render('show', { layout: 'show', claimInfo, shortId, openGraphInfo });
  },
  showFileLite (claimInfo, shortId, res) {
    const openGraphInfo = module.exports.createOpenGraphInfo(claimInfo);
    res.status(200).render('showLite', { layout: 'showlite', claimInfo, shortId, openGraphInfo });
  },
  createOpenGraphInfo ({ claimId, name, fileExt }) {
    return {
      embedUrl     : `https://spee.ch/embed/${claimId}/${name}`,
      showUrl      : `https://spee.ch/${claimId}/${name}`,
      source       : `https://spee.ch/${claimId}/${name}.${fileExt}`,
      directFileUrl: `https://spee.ch/${claimId}/${name}.${fileExt}`,
    };
  },
};
