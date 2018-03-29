const { details: { host } } = require('siteConfig.js');

const sendEmbedPage = () => {
  return ({ params }, res) => {
    const claimId = params.claimId;
    const name = params.name;
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', host, claimId, name });
  };
};

module.exports = sendEmbedPage;
