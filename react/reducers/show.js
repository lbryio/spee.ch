import * as actions from 'constants/show_action_types';
import { CHANNEL, ASSET } from 'constants/show_request_types';

const initialState = {
  requestType   : null,
  channelRequest: {
    name: null,
    id  : null,
  },
  assetRequest: {
    name    : null,
    modifier: {
      id     : null,
      channel: {
        name: null,
        id  : null,
      },
    },
    extension: null,
  },
  channelData: {
    name   : null,
    shortId: null,
    longId : null,
  },
  channelClaimsData: {
    claims     : null,
    currentPage: 1,
    totalPages : null,
    totalClaims: null,
  },
  assetData: null,
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_UPDATE_CHANNEL:
      return Object.assign({}, state, {
        requestType   : CHANNEL,
        channelRequest: {
          name: action.name,
          id  : action.id,
        },
      });
    case actions.REQUEST_UPDATE_CLAIM:
      return Object.assign({}, state, {
        requestType : ASSET,
        assetRequest: {
          name    : action.name,
          modifier: {
            id     : action.id,
            channel: {
              name: action.channelName,
              id  : action.channelId,
            },
          },
          extension: action.extension,
        },
      });
    case actions.CHANNEL_DATA_UPDATE:
      return Object.assign({}, state, {
        channelData: Object.assign({}, state.channel, {
          name   : action.name,
          shortId: action.shortId,
          longId : action.longId,
        }),
      });
    case actions.CHANNEL_CLAIMS_DATA_UPDATE:
      return Object.assign({}, state, {
        channelClaimsData: {
          claims     : action.claims,
          currentPage: action.currentPage,
          totalPages : action.totalPages,
          totalClaims: action.totalClaims,
        },
      });
    case actions.ASSET_DATA_UPDATE:
      return Object.assign({}, state, {
        assetData: action.data,
      });
    default:
      return state;
  }
}
