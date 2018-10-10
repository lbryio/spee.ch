import BlockModel from '../models/BlockModel';

export default {
  createModel(...args) {
    return BlockModel(...args);
  },

  associate(db) {
    // associate
  },
}
