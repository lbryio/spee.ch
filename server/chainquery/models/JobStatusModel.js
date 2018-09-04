const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
}) => sequelize.define(
  'job_status',
  {
    job_name: {
      primaryKey: true,
      type: STRING,
      set() { },
    },
    last_sync: {
      type: INTEGER,
      set() { },
    },
    is_success: {
      type: INTEGER,
      set() { },
    },
    error_message: {
      type: TEXT,
      set() { },
    }
  },
  {
    freezeTableName: true,
    getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
