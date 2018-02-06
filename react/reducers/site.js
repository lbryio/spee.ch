const { site } = require('../../config/speechConfig.js');

const initialState = {
  host: site.host,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
