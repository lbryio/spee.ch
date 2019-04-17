const logout = (req, res) => {
  req.logout();
  const responseObject = {
    success: true,
    message: 'you successfully logged out',
  };
  res.status(200).json(responseObject);
};

export default logout;
