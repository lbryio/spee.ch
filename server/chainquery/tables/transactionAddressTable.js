import TransactionAddressModel from '../models/TransactionAddressModel';

export default {
  createModel(...args) {
    return TransactionAddressModel(...args);
  },

  associate(db) {
    // associate
  }
}
