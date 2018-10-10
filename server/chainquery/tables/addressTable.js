import AddressModel from '../models/AddressModel';

export default {
  createModel(...args) {
    return AddressModel(...args);
  },

  associate(db) {
    // associate
  },
}
