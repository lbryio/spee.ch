const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
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
      type: INTEGER,
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
      type: INTEGER,
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
      type: INTEGER,
      set() { },
    },
    modified: {
      type: INTEGER,
      set() { },
    },
  },
  {
    freezeTableName: true,
    getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
