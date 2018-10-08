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
  'transaction_address',
  {
    transaction_id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    address_id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    debit_amount: {
      type: DECIMAL(18, 8),
      set() { },
    },
    credit_amount: {
      type: DECIMAL(18, 8),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
