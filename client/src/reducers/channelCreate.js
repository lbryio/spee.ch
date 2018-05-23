import * as actions from '../constants/channel_create_action_types';

const initialState = {
  name: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.CHANNEL_CREATE_UPDATE_NAME:
      return Object.assign({}, state, {
        name: Object.assign({}, state.name, {
          [action.data.name]: action.data.value,
        }),
      });
    case actions.CHANNEL_CREATE_UPDATE_PASSWORD:
      return Object.assign({}, state, {
        password: Object.assign({}, state.password, {
          [action.data.name]: action.data.value,
        }),
      });
    case actions.CHANNEL_CREATE_UPDATE_STATUS:
      return Object.assign({}, state, {
        status: action.data,
      });
    default:
      return state;
  }
}
