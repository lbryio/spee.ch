import TransactionModel from '../models/TransactionModel';

export default {
  createModel(...args) {
    return TransactionModel(...args);
  },

  associate(db) {
    // associate
  }
}
