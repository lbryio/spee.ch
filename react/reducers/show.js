import * as actions from 'constants/show_action_types';

const initialState = {
  request: {
    channel: null,
    claim  : null,
  },
  channel: {
    name      : null,
    shortId   : null,
    longId    : null,
    claimsData: {
      claims     : null,
      currentPage: null,
      totalPages : null,
      totalClaims: null,
    },
  },
  claim: null,
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.CLAIM_REQUEST_UPDATE:
      return Object.assign({}, state, {
        request: {
          channel: null,
          claim  : action.claim,
        },
      });
    case actions.CHANNEL_REQUEST_UPDATE:
      return Object.assign({}, state, {
        request: {
          channel: action.channel,
          claim  : null,
        },
      });
    case actions.CHANNEL_DATA_UPDATE:
      return Object.assign({}, state, {
        channel: Object.assign({}, state.channel, {
          name   : action.name,
          shortId: action.shortId,
          longId : action.longId,
        }),
      });
    case actions.CHANNEL_CLAIMS_UPDATE:
      return Object.assign({}, state, {
        channel: Object.assign({}, state.channel, {
          claimsData: {
            claims     : action.claims,
            currentPage: action.currentPage,
            totalPages : action.totalPages,
            totalClaims: action.totalClaims,
          },
        }),
      });
    case actions.CLAIM_DATA_UPDATE:
      return Object.assign({}, state, {
        claim: action.data,
      });
    default:
      return state;
  }
}
