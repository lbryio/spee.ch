module.exports = app => {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', ({ originalUrl, ip }, res) => {
    // send response
    res.status(404).render('404');
  });
};
