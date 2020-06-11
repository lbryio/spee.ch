module.exports = {
  ...require('./pages').default,
  ...require('./api').default,
  ...require('./auth').default,
  // ...require('./assets').default,
  ...require('./fallback').default,
};
