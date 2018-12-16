module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return isDev ? [
    require('./webpack/webpack.server.config')(env, argv),
  ] : [
    require('./webpack/webpack.server.config')(env, argv),
    require('./webpack/webpack.client.config')(env, argv),
  ];
}
