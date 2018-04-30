const serializeUser = (user, done) => {
  // returns user data to be serialized into session
  console.log('serializing user');
  done(null, user);
};

module.exports = serializeUser;
