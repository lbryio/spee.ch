const logger = require('winston');

module.exports = {
  serveFile ({ filePath, fileType }, claimId, name, res) {
    logger.verbose(`serving file: ${filePath}`);
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
    logger.verbose(`showing claim: ${claimInfo.name}#${claimInfo.claimId}`);
    res.status(200).render('show', { layout: 'show', claimInfo, shortId });
  },
  showFileLite (claimInfo, shortId, res) {
    logger.verbose(`showlite claim: ${claimInfo.name}#${claimInfo.claimId}`);
    res.status(200).render('showLite', { layout: 'showlite', claimInfo, shortId });
  },
};
