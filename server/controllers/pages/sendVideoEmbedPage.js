const { details: { host } } = require('@config/siteConfig');

const sendVideoEmbedPage = ({ params }, res) => {
  const claimId = params.claimId;
  const name = params.name;
  console.log('HOST:', host);
  console.log('CLAIM ID:', claimId);
  console.log('NAME:', name);
  // get and render the content
  res.status(200).render('embed', { host, claimId, name });
};

module.exports = sendVideoEmbedPage;
