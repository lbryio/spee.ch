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
