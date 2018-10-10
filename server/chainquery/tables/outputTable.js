import OutputModel from '../models/OutputModel';

export default {
  createModel(...args) {
    return OutputModel(...args);
  },

  associate(db) {
    // associate
  },
}
