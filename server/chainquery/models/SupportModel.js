const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
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
      type: INTEGER,
      set() { },
    },
    modified_at: {
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
