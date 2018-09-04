const Sequelize = require('sequelize');
const logger = require('winston');

import abnormalClaimTable from './tables/abnormalClaimTable';
import addressTable from './tables/addressTable';
import applicationStatusTable from './tables/applicationStatusTable';
import blockTable from './tables/blockTable';
import claimTable from './tables/claimTable';
import gorpMigrationsTable from './tables/gorpMigrationsTable';
import inputTable from './tables/inputTable';
import jobStatusTable from './tables/jobStatusTable';
import outputTable from './tables/outputTable';
import supportTable from './tables/supportTable';
import transactionAddressTable from './tables/transactionAddressTable';
import transactionTable from './tables/transactionTable';

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
db.abnormal_claim = sequelize.import('abnormal_claim', abnormalClaimTable.createModel);
db.application_status = sequelize.import('application_status', applicationStatusTable.createModel);
db.address = sequelize.import('address', addressTable.createModel);
db.block = sequelize.import('block', blockTable.createModel);
db.claim = sequelize.import('claim', claimTable.createModel);
db.gorp_migrations = sequelize.import('gorp_migrations', gorpMigrationsTable.createModel);
db.input = sequelize.import('input', inputTable.createModel);
db.job_status = sequelize.import('job_status', jobStatusTable.createModel);
db.output = sequelize.import('output', outputTable.createModel);
db.support = sequelize.import('support', supportTable.createModel);
db.transaction_address = sequelize.import('transaction_address', transactionAddressTable.createModel);
db.transaction = sequelize.import('transaction', transactionTable.createModel);

// run model.association for each model in the db object that has an association
logger.info('associating chainquery db models...');
Object.keys(db).forEach(modelName => {
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
