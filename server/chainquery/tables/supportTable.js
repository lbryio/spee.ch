import SupportModel from '../models/SupportModel';

export default {
  createModel(...args) {
    return SupportModel(...args);
  },

  associate(db) {
    // associate
  }
}
