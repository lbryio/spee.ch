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
