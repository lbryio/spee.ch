import GorpMigrationsModel from '../models/GorpMigrationsModel';

export default {
  createModel(...args) {
    return GorpMigrationsModel(...args);
  },

  associate(db) {
    // associate
  }
}
