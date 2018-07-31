const makeDir = require('make-dir');

const port = (defaultAnswer) => {
  return {
    type   : 'input',
    message: 'Enter a PORT for your server to run on.',
    default: defaultAnswer,
    name   : 'port',
  };
};

const title = (defaultAnswer) => {
  return {
    type   : 'input',
    message: 'Enter a title for your site.',
    default: defaultAnswer,
    name   : 'title',
  };
};

const host = (defaultAnswer) => {
  return {
    type   : 'input',
    message: 'Enter your site\'s domain.',
    default: defaultAnswer,
    name   : 'host',
  };
};

const uploadDirectory = (defaultAnswer) => {
  return {
    type   : 'input',
    message: 'Enter a directory where uploads should be stored.',
    default: defaultAnswer,
    name   : 'uploadDirectory',
    validate (input) {
      // make sure the directory exists
      return new Promise((resolve, reject) => {
        console.log('\n\nCreating directory', input, '...');
        try {
          const dirPath = makeDir.sync(input);
          console.log('Successfully created directory at', dirPath, '\n');
        } catch (error) {
          console.log('Failed to create directory, please create directory manually.\n');
        }
        resolve(true);
      });
    },
  };
};

module.exports = (defaultPort, defaultTitle, defaultHost, defaultUploadDirectory) => {
  return [
    port(defaultPort),
    title(defaultTitle),
    host(defaultHost),
    uploadDirectory(defaultUploadDirectory),
  ];
};
