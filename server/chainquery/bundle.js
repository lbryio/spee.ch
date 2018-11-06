'use strict';

var AbnormalClaimModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'abnormal_claim',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    name: {
      type: STRING,
      set() { },
    },
    claim_id: {
      type: STRING,
      set() { },
    },
    is_update: {
      type: BOOLEAN,
      set() { },
    },
    block_hash: {
      type: STRING,
      set() { },
    },
    transaction_hash: {
      type: STRING,
      set() { },
    },
    vout: {
      type: INTEGER,
      set() { },
    },
    output_id: {
      type: INTEGER,
      set() { },
    },
    value_as_hex: {
      type: TEXT,
      set() { },
    },
    value_as_json: {
      type: TEXT,
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var abnormalClaimTable = {
  createModel(...args) {
    return AbnormalClaimModel(...args);
  },

  associate(db) {
    // associate
  },
};

var AddressModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'address',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    address: {
      type: STRING,
      set() { },
    },
    first_seen: {
      type: DATE(6),
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var addressTable = {
  createModel(...args) {
    return AddressModel(...args);
  },

  associate(db) {
    // associate
  },
};

var BlockModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'block',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    bits: {
      type: STRING,
      set() { },
    },
    chainwork: {
      type: STRING,
      set() { },
    },
    confirmations: {
      type: STRING,
      set() { },
    },
    difficulty: {
      type: STRING,
      set() { },
    },
    hash: {
      type: STRING,
      set() { },
    },
    height: {
      type: STRING,
      set() { },
    },
    merkle_root: {
      type: STRING,
      set() { },
    },
    name_claim_root: {
      type: STRING,
      set() { },
    },
    nonce: {
      type: STRING,
      set() { },
    },
    previous_block_hash: {
      type: STRING,
      set() { },
    },
    next_block_hash: {
      type: STRING,
      set() { },
    },
    block_size: {
      type: STRING,
      set() { },
    },
    block_time: {
      type: STRING,
      set() { },
    },
    version: {
      type: STRING,
      set() { },
    },
    version_hex: {
      type: STRING,
      set() { },
    },
    transaction_hashes: {
      type: STRING,
      set() { },
    },
    transactions_processed: {
      type: STRING,
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var blockTable = {
  createModel(...args) {
    return BlockModel(...args);
  },

  associate(db) {
    // associate
  },
};

const logger = require('winston');

const {
  assetDefaults: { thumbnail: defaultThumbnail },
  details: { host }
} = require('../../site/config/siteConfig'); // TODO: Fix paths for rollup

const getterMethods$3 = {
  generated_extension() {
    switch (this.content_type) {
      case 'image/jpeg':
      case 'image/jpg':
        return 'jpg';
      case 'image/png':
        return 'png';
      case 'image/gif':
        return 'gif';
      case 'video/mp4':
        return 'mp4';
      default:
        logger.debug('setting unknown file type as file extension jpg');
        return 'jpg';
    }
  },

  // TODO: Factor this out.
  generated_thumbnail() {
    return this.thumbnail_url || defaultThumbnail;
  },

  generated_channel() {
    console.log(this);
    //
  }
};

var ClaimModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  ENUM,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'claim',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    transaction_hash_id: {
      type: STRING,
      set() { },
    },
    vout: {
      type: INTEGER,
      set() { },
    },
    name: {
      type: STRING,
      set() { },
    },
    claim_id: {
      type: STRING,
      set() { },
    },
    claim_type: {
      type: INTEGER,
      set() { },
    },
    publisher_id: {
      type: STRING,
      set() { },
    },
    publisher_sig: {
      type: STRING,
      set() { },
    },
    certificate: {
      type: STRING,
      set() { },
    },
    sd_hash: {
      type: STRING,
      set() { },
    },
    transaction_time: {
      type: INTEGER,
      set() { },
    },
    version: {
      type: STRING,
      set() { },
    },
    valid_at_height: {
      type: INTEGER,
      set() { },
    },
    height: {
      type: INTEGER,
      set() { },
    },
    effective_amount: {
      type: INTEGER,
      set() { },
    },
    author: {
      type: STRING,
      set() { },
    },
    description: {
      type: STRING,
      set() { },
    },
    content_type: {
      type: STRING,
      set() { },
    },
    is_nsfw: {
      type: BOOLEAN,
      set() { },
    },
    language: {
      type: STRING,
      set() { },
    },
    thumbnail_url: {
      type: STRING,
      set() { },
    },
    title: {
      type: STRING,
      set() { },
    },
    fee: {
      type: DECIMAL(58, 8),
      set() { },
    },
    fee_currency: {
      type: STRING,
      set() { },
    },
    bid_state: {
      type: ENUM('Active', 'Expired', 'Controlling', 'Spent', 'Accepted'),
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
    fee_address: {
      type: STRING,
      set() { },
    },
    claim_address: {
      type: STRING,
      set() { },
    },
  },
  {
    freezeTableName: true,
    getterMethods: getterMethods$3,
    timestamps: false, // don't use default timestamps columns
  }
);

var claimTable = {
  createModel(...args) {
    return ClaimModel(...args);
  },

  associate(db) {
    // associate
  },
};

var InputModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'input',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    transaction_id: {
      type: INTEGER,
      set() { },
    },
    transaction_hash: {
      type: STRING,
      set() { },
    },
    input_address_id: {
      type: INTEGER,
      set() { },
    },
    is_coinbase: {
      type: BOOLEAN,
      set() { },
    },
    coinbase: {
      type: STRING,
      set() { },
    },
    prevout_hash: {
      type: STRING,
      set() { },
    },
    prevout_n: {
      type: INTEGER.UNSIGNED,
      set() { },
    },
    prevout_spend_updated: {
      type: INTEGER,
      set() { },
    },
    sequence: {
      type: INTEGER,
      set() { },
    },
    value: {
      type: DECIMAL(18, 8),
      set() { },
    },
    script_sig_asm: {
      type: TEXT,
      set() { },
    },
    script_sig_hex: {
      type: TEXT,
      set() { },
    },
    created: {
      type: DATE(6),
      set() { },
    },
    modified: {
      type: DATE(6),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var inputTable = {
  createModel(...args) {
    return InputModel(...args);
  },

  associate(db) {
    // associate
  },
};

var OutputModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'output',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    transaction_id: {
      type: INTEGER,
      set() { },
    },
    transaction_hash: {
      type: STRING,
      set() { },
    },
    value: {
      type: DECIMAL(18, 8),
      set() { },
    },
    vout: {
      type: INTEGER,
      set() { },
    },
    type: {
      type: STRING,
      set() { },
    },
    script_pub_key_asm: {
      type: TEXT,
      set() { },
    },
    script_pub_key_hex: {
      type: TEXT,
      set() { },
    },
    required_signatures: {
      type: INTEGER,
      set() { },
    },
    address_list: {
      type: TEXT,
      set() { },
    },
    is_spent: {
      type: BOOLEAN,
      set() { },
    },
    spent_by_input_id: {
      type: INTEGER,
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
    claim_id: {
      type: STRING,
      set() { },
    }
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var outputTable = {
  createModel(...args) {
    return OutputModel(...args);
  },

  associate(db) {
    // associate
  },
};

var SupportModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'support',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    supported_claim_id: {
      type: STRING,
      set() { },
    },
    support_amount: {
      type: DECIMAL(18, 8),
      set() { },
    },
    bid_state: {
      type: STRING,
      set() { },
    },
    transaction_hash_id: {
      type: STRING,
      set() { },
    },
    vout: {
      type: INTEGER,
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var supportTable = {
  createModel(...args) {
    return SupportModel(...args);
  },

  associate(db) {
    // associate
  },
};

var TransactionAddressModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'transaction_address',
  {
    transaction_id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    address_id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    debit_amount: {
      type: DECIMAL(18, 8),
      set() { },
    },
    credit_amount: {
      type: DECIMAL(18, 8),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var transactionAddressTable = {
  createModel(...args) {
    return TransactionAddressModel(...args);
  },

  associate(db) {
    // associate
  },
};

var TransactionModel = (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
}) => sequelize.define(
  'transaction',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    block_hash_id: {
      type: STRING,
      set() { },
    },
    input_count: {
      type: INTEGER,
      set() { },
    },
    output_count: {
      type: INTEGER,
      set() { },
    },
    fee: {
      type: DECIMAL(18, 8),
      set() { },
    },
    transaction_time: {
      type: INTEGER,
      set() { },
    },
    transaction_size: {
      type: INTEGER,
      set() { },
    },
    hash: {
      type: STRING,
      set() { },
    },
    version: {
      type: INTEGER,
      set() { },
    },
    lock_time: {
      type: DATE(6),
      set() { },
    },
    raw: {
      type: TEXT,
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
    created_time: {
      type: DATE(6),
      set() {},
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);

var transactionTable = {
  createModel(...args) {
    return TransactionModel(...args);
  },

  associate(db) {
    // associate
  },
};

var abnormalClaimQueries = (db, table) => ({
  example: () => table.findAll(),
});

var addressQueries = (db, table) => ({
  example: () => table.findAll(),
});

var blockQueries = (db, table) => ({
  example: () => table.findAll(),
});

const logger$1 = require('winston');

const returnShortId = (claimsArray, longId) => {
  let claimIndex;
  let shortId = longId.substring(0, 1); // default short id is the first letter
  let shortIdLength = 0;
  // find the index of this claim id
  claimIndex = claimsArray.findIndex(element => {
    return element.claim_id === longId;
  });
  if (claimIndex < 0) {
    throw new Error('claim id not found in claims list');
  }
  // get an array of all claims with lower height
  let possibleMatches = claimsArray.slice(0, claimIndex);
  // remove certificates with the same prefixes until none are left.
  while (possibleMatches.length > 0) {
    shortIdLength += 1;
    shortId = longId.substring(0, shortIdLength);
    possibleMatches = possibleMatches.filter(element => {
      return (element.claim_id && (element.claim_id.substring(0, shortIdLength) === shortId));
    });
  }
  return shortId;
};

const isLongClaimId = (claimId) => {
  return (claimId && (claimId.length === 40));
};

const isShortClaimId = (claimId) => {
  return (claimId && (claimId.length < 40));
};

var claimQueries = (db, table, sequelize) => ({

  getClaimChannelName: async (publisher_id) => {
    return await table.findAll({
      where     : { claim_id: publisher_id },
      attributes: ['name'],
    }).then(result => {
      if(result.length === 0) {
        throw new Error(`no record found for ${claimId}`);
      } else if(result.length !== 1) {
        logger$1.warn(`more than one record matches ${claimId} in db.Claim`);
      }

      return result[0].name;
    });
  },

  getShortClaimIdFromLongClaimId: async (claimId, claimName, pendingClaim) => {
    logger$1.debug(`claim.getShortClaimIdFromLongClaimId for ${claimName}#${claimId}`);
    return await table.findAll({
      where: { name: claimName },
      order: [['height', 'ASC']],
    }).then(result => {
      if(result.length === 0) {
        throw new Error('No claim(s) found with that claim name');
      }

      let list = result.map(claim => claim.dataValues);
      if (pendingClaim) {
        list = list.concat(pendingClaim);
      }

      return returnShortId(list, claimId);
    });
  },

  getAllChannelClaims: async (channelClaimId, bidState) => {
    logger$1.debug(`claim.getAllChannelClaims for ${channelClaimId}`);
    const whereClause = bidState || {
      [sequelize.Op.or]: [
        { bid_state: 'Controlling' },
        { bid_state: 'Active' },
        { bid_state: 'Accepted' },
      ],
    };
    const selectWhere = {
      ...whereClause,
      publisher_id: channelClaimId,
    };
    return await table.findAll({
      where: selectWhere,
      order: [['height', 'DESC']],
    })
      .then(channelClaimsArray => {
        if (channelClaimsArray.length === 0) {
          return null;
        }
        return channelClaimsArray;
      });
  },

  getClaimIdByLongChannelId: async (channelClaimId, claimName) => {
    logger$1.debug(`finding claim id for claim ${claimName} from channel ${channelClaimId}`);
    return await table.findAll({
      where: { name: claimName, publisher_id: channelClaimId },
      order: [['id', 'ASC']],
    })
    .then(result => {
      switch (result.length) {
        case 0:
          return null;
        case 1:
          return result[0].claim_id;
        default:
          // Does this actually happen??? (from converted code)
          logger$1.warn(`${result.length} records found for "${claimName}" in channel "${channelClaimId}"`);
          return result[0].claim_id;
      }
    });
  },

  validateLongClaimId: async (name, claimId) => {
    return await table.findOne({
      where: {
        name,
        claim_id: claimId,
      },
    }).then(result => {
      if (!result) {
        return false;
      }
      return claimId;
    });
  },

  getLongClaimIdFromShortClaimId: async (name, shortId) => {
    return await table.findAll({
      where: {
        name,
        claim_id: {
          [sequelize.Op.like]: `${shortId}%`,
        }},
      order: [['height', 'ASC']],
    })
    .then(result => {
      if(result.length === 0) {
        return null;
      }

      return result[0].claim_id;
    });
  },

  getTopFreeClaimIdByClaimName: async (name) => {
    return await table.findAll({
      // TODO: Limit 1
      where: { name },
      order: [['effective_amount', 'DESC'], ['height', 'ASC']],
    }).then(result => {
      if(result.length === 0) {
        return null;
      }
      return result[0].claim_id;
    })
  },

  getLongClaimId: async (claimName, claimId) => {
    // TODO: Add failure case
    logger$1.debug(`getLongClaimId(${claimName}, ${claimId})`);
    if (isLongClaimId(claimId)) {
      return table.queries.validateLongClaimId(claimName, claimId);
    } else if (isShortClaimId(claimId)) {
      return table.queries.getLongClaimIdFromShortClaimId(claimName, claimId);
    } else {
      return table.queries.getTopFreeClaimIdByClaimName(claimName);
    }
  },

  resolveClaim: async (name, claimId) => {
    logger$1.debug(`Claim.resolveClaim: ${name} ${claimId}`);
    return table.findAll({
      where: { name, claim_id: claimId },
    }).then(claimArray => {
      if(claimArray.length === 0) {
        return null;
      } else if(claimArray.length !== 1) {
        logger$1.warn(`more than one record matches ${name}#${claimId} in db.Claim`);
      }

      return claimArray[0];
    });
  },

  resolveClaimInChannel: async (claimName, channelId) => {
    logger$1.debug(`Claim.resolveClaimByNames: ${claimName} in ${channelId}`);
    return table.findAll({
      where: {
        name: claimName,
        publisher_id: channelId,
      },
    }).then(claimArray => {
      if (claimArray.length === 0) {
        return null;
      } else if (claimArray.length !== 1) {
        logger$1.warn(`more than one record matches ${claimName} in ${channelId}`);
      }

      return claimArray[0];
    });
  },

  getOutpoint: async (name, claimId) => {
    logger$1.debug(`finding outpoint for ${name}#${claimId}`);

    return await table.findAll({
      where     : { name, claim_id: claimId },
      attributes: ['transaction_hash_id'],
    }).then(result => {
      if(result.length === 0) {
        throw new Error(`no record found for ${name}#${claimId}`);
      } else if(result.length !== 1) {
        logger$1.warn(`more than one record matches ${name}#${claimId} in db.Claim`);
      }

      return result[0].transaction_hash_id;
    });
  },

  getCurrentHeight: async () => {
    return await table
    .max('height')
    .then(result => {
      return (result || 100000);
    });
  },

});

var inputQueries = (db, table) => ({
  example: () => table.findAll(),
});

var outputQueries = (db, table) => ({
  example: () => table.findAll(),
});

var supportQueries = (db, table) => ({
  example: () => table.findAll(),
});

var transactionAddressQueries = (db, table) => ({
  example: () => table.findAll(),
});

var transactionQueries = (db, table) => ({
  example: () => table.findAll(),
});

const Sequelize = require('sequelize');
const logger$2 = require('winston');

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
  host: host$1,
  port,
  database,
  username,
  password,
} = require('../../site/config/chainqueryConfig'); // TODO: Make '@config/siteConfig' work outside Webpack for testing/dev

if (!database || !username || !password) {
  logger$2.warn('missing database, user, or password from chainqueryConfig');
}

// set sequelize options
const sequelize = new Sequelize(database, username, password, {
  host          : host$1,
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
logger$2.info('associating chainquery db models...');
DATABASE_STRUCTURE_KEYS.forEach(modelName => {
  if (db[modelName].associate) {
    logger$2.info('Associating chainquery model:', modelName);
    db[modelName].associate(db);
  }
});

// establish mysql connection
sequelize
  .authenticate()
  .then(() => {
    logger$2.info('Sequelize has established mysql connection for chainquery successfully.');
  })
  .catch(err => {
    logger$2.error('Sequelize was unable to connect to the chainquery database:', err);
  });

module.exports = db;
