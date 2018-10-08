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
