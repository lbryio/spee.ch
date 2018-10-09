const logger = require('winston');

const {
  assetDefaults: { thumbnail: defaultThumbnail },
  details: { host }
} = require('../../config/siteConfig'); // TODO: Fix paths for rollup

const getterMethods = {
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
}

export default (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
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
    is_filtered: {
      type: BOOLEAN,
      set() { },
    },
    bid_state: {
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
    getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
