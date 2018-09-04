import ApplicationStatusModel from '../models/ApplicationStatusModel';

export default {
  createModel(...args) {
    return ApplicationStatusModel(...args);
  },

  associate(db) {
    // associate
  }
}
