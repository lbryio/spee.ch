import InputModel from '../models/InputModel';

export default {
  createModel(...args) {
    return InputModel(...args);
  },

  associate(db) {
    // associate
  },
}
