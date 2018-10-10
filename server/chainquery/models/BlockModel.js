const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
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
