module.exports = app => {
  // route for the home page
  app.get('/', (req, res) => {
    res.status(200).render('index');
  });
  // a catch-all route if someone visits a page that does not exist
  app.use('*', ({ originalUrl, ip }, res) => {
    // send response
    res.status(404).render('fourOhFour');
  });
};
