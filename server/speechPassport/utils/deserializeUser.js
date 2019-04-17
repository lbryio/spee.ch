const deserializeUser = (user, done) => {
  // deserializes session and populates additional info to req.user
  done(null, user);
};

export default deserializeUser;
