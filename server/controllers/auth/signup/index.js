const signup = (req, res) => {
  res.status(200).json({
    success       : true,
    channelName   : req.user.channelName,
    channelClaimId: req.user.channelClaimId,
    shortChannelId: req.user.shortChannelId,
  });
};

module.exports = signup;
