module.exports = (name) => {
  const config = require(`@config/${name}`);
  if (!config) {
    throw new Error(`No config file found for ${name}.  Please run 'npm run configure' to build your config files.`);
  }
};
