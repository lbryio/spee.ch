const { details: { host } } = require('@config/siteConfig');

const sendVideoEmbedPage = ({ params }, res) => {
  const claimId = params.claimId;
  const name = params.name;
  // test setting response headers
  console.log('removing x-frame-options');
  res.removeHeader('X-Frame-Options');
  // get and render the content
  res.status(200).render('embed', { host, claimId, name });
};

module.exports = sendVideoEmbedPage;
