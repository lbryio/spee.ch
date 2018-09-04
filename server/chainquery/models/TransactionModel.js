const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
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
      type: INTEGER,
      set() { },
    },
    raw: {
      type: TEXT,
      set() { },
    },
    created_at: {
      type: INTEGER,
      set() { },
    },
    modified_at: {
      type: INTEGER,
      set() { },
    },
    created_time: {
      type: INTEGER,
      set() {},
    },
  },
  {
    freezeTableName: true,
    getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
