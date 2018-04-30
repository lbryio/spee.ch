const deserializeUser = (user, done) => {
  // deserializes session and populates additional info to req.user
  console.log('deserializing user');
  done(null, user);
};

module.exports = deserializeUser;
