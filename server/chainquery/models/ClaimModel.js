const logger = require('winston');
const mime = require('mime-types');
const {
  serving: { customFileExtensions },
} = require('@config/siteConfig');

const getterMethods = {
  generated_extension() {
    logger.debug('trying to generate extension', this.content_type);
    if (customFileExtensions.hasOwnProperty(this.content_type)) {
      return customFileExtensions[this.content_type];
    } else {
      return mime.extension(this.content_type) ? mime.extension(this.content_type) : 'jpg';
    }
  },
  generated_outpoint() {
    return `${this.transaction_hash_id}:${this.vout}`;
  },
};

export default (sequelize, { BOOLEAN, DATE, DECIMAL, ENUM, INTEGER, STRING, TEXT }) =>
  sequelize.define(
    'claim',
    {
      id: {
        primaryKey: true,
        type: INTEGER,
        set() {},
      },
      transaction_hash_id: {
        type: STRING,
        set() {},
      },
      vout: {
        type: INTEGER,
        set() {},
      },
      name: {
        type: STRING,
        set() {},
      },
      claim_id: {
        type: STRING,
        set() {},
      },
      claim_type: {
        type: INTEGER,
        set() {},
      },
      publisher_id: {
        type: STRING,
        set() {},
      },
      publisher_sig: {
        type: STRING,
        set() {},
      },
      certificate: {
        type: STRING,
        set() {},
      },
      sd_hash: {
        type: STRING,
        set() {},
      },
      transaction_time: {
        type: INTEGER,
        set() {},
      },
      version: {
        type: STRING,
        set() {},
      },
      valid_at_height: {
        type: INTEGER,
        set() {},
      },
      height: {
        type: INTEGER,
        set() {},
      },
      effective_amount: {
        type: INTEGER,
        set() {},
      },
      author: {
        type: STRING,
        set() {},
      },
      description: {
        type: STRING,
        set() {},
      },
      content_type: {
        type: STRING,
        set() {},
      },
      is_nsfw: {
        type: BOOLEAN,
        set() {},
      },
      language: {
        type: STRING,
        set() {},
      },
      thumbnail_url: {
        type: STRING,
        set() {},
      },
      title: {
        type: STRING,
        set() {},
      },
      fee: {
        type: DECIMAL(58, 8),
        set() {},
      },
      fee_currency: {
        type: STRING,
        set() {},
      },
      bid_state: {
        type: ENUM('Active', 'Expired', 'Controlling', 'Spent', 'Accepted'),
        set() {},
      },
      created_at: {
        type: DATE(6),
        set() {},
      },
      modified_at: {
        type: DATE(6),
        set() {},
      },
      fee_address: {
        type: STRING,
        set() {},
      },
      claim_address: {
        type: STRING,
        set() {},
      },
      license: {
        type: STRING,
        set() {},
      },
      license_url: {
        type: STRING,
        set() {},
      },
    },
    {
      freezeTableName: true,
      getterMethods,
      timestamps: false, // don't use default timestamps columns
    }
  );
