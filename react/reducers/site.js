const { details: { host } } = require('../../config/siteConfig.js');

const initialState = {
  host: host,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
