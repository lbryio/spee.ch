const redirect = (route) => {
  return (req, res) => {
    res.status(301).redirect(route);
  };
};

module.exports = redirect;
