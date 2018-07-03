const { details: { host } } = require('@config/siteConfig');

const sendVideoEmbedPage = ({ params }, res) => {
  const claimId = params.claimId;
  const name = params.name;
  // get and render the content
  res.status(200).render('embed', { host, claimId, name });
};

module.exports = sendVideoEmbedPage;
