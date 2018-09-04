import ClaimModel from '../models/ClaimModel';

export default {
  createModel(...args) {
    return ClaimModel(...args);
  },

  associate(db) {
    // associate
  }
}
