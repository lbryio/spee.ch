const user = (req, res) => {
  if (req.user) {
    res.status(200).json({success: true, data: req.user});
  } else {
    res.status(401).json({success: false, message: 'user is not logged in'});
  }
};

module.exports = user;
