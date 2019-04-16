const user = (req, res) => {
  const responseObject = {
    success: true,
    data: req.user,
  };
  res.status(200).json(responseObject);
};

export default user;
