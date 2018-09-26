const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
}) => sequelize.define(
  'abnormal_claim',
  {
    id: {
      primaryKey: true,
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
    is_update: {
      type: INTEGER,
      set() { },
    },
    block_hash: {
      type: STRING,
      set() { },
    },
    transaction_hash: {
      type: STRING,
      set() { },
    },
    vout: {
      type: INTEGER,
      set() { },
    },
    output_id: {
      type: INTEGER,
      set() { },
    },
    value_as_hex: {
      type: TEXT,
      set() { },
    },
    value_as_json: {
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
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
