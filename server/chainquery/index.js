const Sequelize = require('sequelize');
const logger = require('winston');

import abnormalClaimTable from './tables/abnormalClaimTable';
import addressTable from './tables/addressTable';
import blockTable from './tables/blockTable';
import claimTable from './tables/claimTable';
import inputTable from './tables/inputTable';
import outputTable from './tables/outputTable';
import supportTable from './tables/supportTable';
import transactionAddressTable from './tables/transactionAddressTable';
import transactionTable from './tables/transactionTable';

import abnormalClaimQueries from './queries/abnormalClaimQueries';
import addressQueries from './queries/addressQueries';
import blockQueries from './queries/blockQueries';
import claimQueries from './queries/claimQueries';
import inputQueries from './queries/inputQueries';
import outputQueries from './queries/outputQueries';
import supportQueries from './queries/supportQueries';
import transactionAddressQueries from './queries/transactionAddressQueries';
import transactionQueries from './queries/transactionQueries';

const DATABASE_STRUCTURE = {
  'abnormal_claim': {
    table: abnormalClaimTable,
    queries: abnormalClaimQueries,
  },
  'address': {
    table: addressTable,
    queries: addressQueries,
  },
  'block': {
    table: blockTable,
    queries: blockQueries,
  },
  'claim': {
    table: claimTable,
    queries: claimQueries,
  },
  'input': {
    table: inputTable,
    queries: inputQueries,
  },
  'output': {
    table: outputTable,
    queries: outputQueries,
  },
  'support': {
    table: supportTable,
    queries: supportQueries,
  },
  'transaction_address': {
    table: transactionAddressTable,
    queries: transactionAddressQueries,
  },
  'transaction': {
    table: transactionTable,
    queries: transactionQueries,
  },
};

const {
  host,
  port,
  database,
  username,
  password,
} = require('../../config/chainqueryConfig'); // TODO: Make '@config/siteConfig' work outside Webpack for testing/dev

if (!database || !username || !password) {
  logger.warn('missing database, user, or password from chainqueryConfig');
}

// set sequelize options
const sequelize = new Sequelize(database, username, password, {
  host          : host,
  import        : port,
  dialect       : 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
  logging: false,
  pool   : {
    max    : 5,
    min    : 0,
    idle   : 10000,
    acquire: 10000,
  },
  operatorsAliases: false,
});

const db = {};
const DATABASE_STRUCTURE_KEYS = Object.keys(DATABASE_STRUCTURE);

for(let i = 0; i < DATABASE_STRUCTURE_KEYS.length; i++) {
  let dbKey = DATABASE_STRUCTURE_KEYS[i];
  let currentData = DATABASE_STRUCTURE[dbKey];

  db[dbKey] = currentData.table.createModel(sequelize, Sequelize);
  db[dbKey].queries = currentData.queries(db, db[dbKey], sequelize);
}

// run model.association for each model in the db object that has an association
logger.info('associating chainquery db models...');
DATABASE_STRUCTURE_KEYS.forEach(modelName => {
  if (db[modelName].associate) {
    logger.info('Associating chainquery model:', modelName);
    db[modelName].associate(db);
  }
});

// establish mysql connection
sequelize
  .authenticate()
  .then(() => {
    logger.info('Sequelize has established mysql connection for chainquery successfully.');
  })
  .catch(err => {
    logger.error('Sequelize was unable to connect to the chainquery database:', err);
  });

export default db;
