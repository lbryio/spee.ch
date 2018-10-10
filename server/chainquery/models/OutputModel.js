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
