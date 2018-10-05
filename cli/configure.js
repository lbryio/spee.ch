const inquirer = require('inquirer');
const fs = require('fs');
const Path = require('path');
const axios = require('axios');
const ip = require('ip');

const mysqlQuestions = require(Path.resolve(__dirname, 'questions/mysqlQuestions.js'));
const siteQuestions = require(Path.resolve(__dirname, 'questions/siteQuestions.js'));

let primaryClaimAddress = '';
let thumbnailChannelDefault = '@thumbnails';
let thumbnailChannel = '';
let thumbnailChannelId = '';

const createConfigFile = (fileName, configObject) => {  // siteConfig.json , siteConfig
  const fileLocation = Path.resolve(__dirname, `../config/${fileName}`);
  const fileContents = JSON.stringify(configObject, null, 2);
  fs.writeFileSync(fileLocation, fileContents, 'utf-8');
  console.log(`Successfully created /config/${fileName}\n`);
};

// import existing configs or import the defaults
let mysqlConfig;
try {
  mysqlConfig = require('../config/mysqlConfig.json');
} catch (error) {
  mysqlConfig = require('./defaults/mysqlConfig.json');
}
const { database: mysqlDatabase, username: mysqlUsername, password: mysqlPassword } = mysqlConfig;

let siteConfig;
try {
  siteConfig = require('../config/siteConfig.json');
} catch (error) {
  siteConfig = require('./defaults/siteConfig.json');
}
const {
  details: {
    port,
    title,
    host,
  },
  publishing: {
    uploadDirectory,
  },
} = siteConfig;

let lbryConfig;
try {
  lbryConfig = require('../config/lbryConfig.json');
} catch (error) {
  lbryConfig = require('./defaults/lbryConfig.json');
}

let loggerConfig;
try {
  loggerConfig = require('../config/loggerConfig.json');
} catch (error) {
  loggerConfig = require('./defaults/loggerConfig.json');
}

let slackConfig;
try {
  slackConfig = require('../config/slackConfig.json');
} catch (error) {
  slackConfig = require('./defaults/slackConfig.json');
}

// ask user questions and create config files
inquirer
  .prompt(mysqlQuestions(mysqlDatabase, mysqlUsername, mysqlPassword))
  .then(results => {
    console.log('\nCreating mysql config file...');
    createConfigFile('mysqlConfig.json', results);
  })
  .then(() => {
    // check for lbrynet connection & retrieve a default address
    console.log('\nRetrieving your primary claim address from LBRY...');
    return axios
      .post('http://localhost:5279', {
        method: 'wallet_list',
      })
      .then(response => {
        if (response.data) {
          if (response.data.error) {
            throw new Error(response.data.error.message);
          }

          primaryClaimAddress = response.data.result[0];
          console.log('Primary claim address:', primaryClaimAddress, '!\n');
          siteConfig['publishing']['primaryClaimAddress'] = primaryClaimAddress;
          return;
        }
        throw new Error('No data received from lbrynet');
      }).catch(error => {
        throw error;
      });
  })
  .then(() => {
    console.log('\nChecking to see if a LBRY channel exists for thumbnails...');
    // see if a channel name already exists in the configs
    const { publishing } = siteConfig;
    thumbnailChannel = publishing.thumbnailChannel;
    thumbnailChannelId = publishing.thumbnailChannelId;
    console.log(`Thumbnail channel in configs: ${thumbnailChannel}#${thumbnailChannelId}.`);
    // see if channel exists in the wallet
    return axios
      .post('http://localhost:5279', {
        method: 'channel_list',
      })
      .then(response => {
        if (response.data) {
          if (response.data.error) {
            throw new Error(response.data.error.message);
          }

          const channelList = response.data.result || [];
          console.log('channels in this wallet:', channelList.length);
          for (let i = 0; i < channelList.length; i++) {
            if (channelList[i].name === thumbnailChannelDefault) {
              const foundChannel = channelList[i];
              console.log(`Found a thumbnail channel in wallet.`);
              if (foundChannel.is_mine === false) {
                console.log('Channel was not mine');
                continue;
              }
              console.log('name:', foundChannel.name);
              console.log('claim_id:', foundChannel.claim_id);
              if (foundChannel.name === thumbnailChannel && foundChannel.claim_id === thumbnailChannelId) {
                console.log('No update to existing thumbnail config required\n');
              } else {
                console.log(`Replacing thumbnail channel in config...`);
                siteConfig['publishing']['thumbnailChannel'] = foundChannel.name;
                siteConfig['publishing']['thumbnailChannelId'] = foundChannel.claim_id;
                console.log(`Successfully replaced channel in config.\n`);
              }
              return true;
            }
          }
          console.log(`Did not find a thumbnail channel that is mine in wallet.\n`);
          return false;
        }
        throw new Error('No data received from lbrynet');
      }).catch(error => {
        throw error;
      });
  })
  .then((thumbnailChannelAlreadyExists) => {
    // exit if a channel already exists, skip this step
    if (thumbnailChannelAlreadyExists) {
      return;
    }
    // create thumbnail address
    console.log('\nCreating a LBRY channel to publish your thumbnails to...');
    return axios
      .post('http://localhost:5279', {
        method: 'channel_new',
        params: {
          channel_name: thumbnailChannelDefault,
          amount      : '0.1',
        },
      })
      .then(response => {
        if (response.data) {
          if (response.data.error) {
            throw new Error(response.data.error.message);
          }

          thumbnailChannel = thumbnailChannelDefault;
          thumbnailChannelId = response.data.result.claim_id;
          siteConfig['publishing']['thumbnailChannel'] = thumbnailChannel;
          siteConfig['publishing']['thumbnailChannelId'] = thumbnailChannelId;
          console.log(`Created channel: ${thumbnailChannel}#${thumbnailChannelId}\n`);
          return;
        }
        throw new Error('No data received from lbrynet');
      }).catch(error => {
        throw error;
      });
  })
  .then(() => {
    return inquirer.prompt(siteQuestions(port, title, host, uploadDirectory));
  })
  .then(results => {
    console.log('\nCreating site config file...');
    siteConfig['details']['port'] = results.port;
    siteConfig['details']['title'] = results.title;
    siteConfig['details']['host'] = results.host;
    siteConfig['details']['ipAddress'] = ip.address();
    siteConfig['publishing']['uploadDirectory'] = results.uploadDirectory;
  })
  .then(() => {
    // create the config files
    createConfigFile('siteConfig.json', siteConfig);
    createConfigFile('lbryConfig.json', lbryConfig);
    createConfigFile('loggerConfig.json', loggerConfig);
    createConfigFile('slackConfig.json', slackConfig);
  })
  .then(() => {
    console.log('\nYou\'re all done!');
    console.log('Next step: run "npm run start" to build and start your server!');
    console.log('If you want to change any settings, you can edit the files in the "/config" folder.');
    process.exit(0);
  })
  .catch(error => {
    if (error.code === 'ECONNREFUSED') {
      console.log('Error: could not connect to LBRY.  Please make sure lbrynet daemon is running.');
      process.exit(1);
    } else {
      console.log(error);
      process.exit(1);
    }
  });
