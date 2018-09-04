import JobStatusModel from '../models/JobStatusModel';

export default {
  createModel(...args) {
    return JobStatusModel(...args);
  },

  associate(db) {
    // associate
  }
}
