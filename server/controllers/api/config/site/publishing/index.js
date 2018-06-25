const { publishing: {
  primaryClaimAddress,
  uploadDirectory,
  thumbnailChannel,
  thumbnailChannelId,
  additionalClaimAddresses,
  disabled,
  disabledMessage
} } = require('@config/siteConfig');

/*

  route to see if publishing is enabled

*/

const publishingConfig = (req, res) => {
  return res.status(200).json({
    primaryClaimAddress,
    uploadDirectory,
    thumbnailChannel,
    thumbnailChannelId,
    additionalClaimAddresses,
    disabled,
    disabledMessage
  });
};

module.exports = publishingConfig;
