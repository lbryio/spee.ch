import AbnormalClaimModel from '../models/AbnormalClaimModel';

export default {
  createModel(...args) {
    return AbnormalClaimModel(...args);
  },

  associate(db) {
    // associate
  },
}
