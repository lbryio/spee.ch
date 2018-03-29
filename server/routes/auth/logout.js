const logout = () => {
  return (req, res) => {
    req.logout();
    res.status(200).json({success: true, message: 'you successfully logged out'});
  };
};

module.exports = logout;
