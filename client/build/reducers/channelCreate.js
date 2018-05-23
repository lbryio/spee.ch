"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var actions = _interopRequireWildcard(require("../constants/channel_create_action_types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  name: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  },
  status: null
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions.CHANNEL_CREATE_UPDATE_NAME:
      return Object.assign({}, state, {
        name: Object.assign({}, state.name, _defineProperty({}, action.data.name, action.data.value))
      });

    case actions.CHANNEL_CREATE_UPDATE_PASSWORD:
      return Object.assign({}, state, {
        password: Object.assign({}, state.password, _defineProperty({}, action.data.name, action.data.value))
      });

    case actions.CHANNEL_CREATE_UPDATE_STATUS:
      return Object.assign({}, state, {
        status: action.data
      });

    default:
      return state;
  }
}