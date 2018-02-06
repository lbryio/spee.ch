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
  showChannel: {
    channelData: {
      name   : null,
      shortId: null,
      longId : null,
    },
    channelClaimsData: {
      claims     : null,
      currentPage: null,
      totalPages : null,
      totalClaims: null,
    },
  },
  showAsset: {
    claimData: {
      data   : null,
      shortId: null,
    },
  },
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_UPDATE_CHANNEL:
      return Object.assign({}, state, {
        requestType   : CHANNEL,
        channelRequest: action.data,
      });
    case actions.REQUEST_UPDATE_CLAIM:
      return Object.assign({}, state, {
        requestType : ASSET,
        assetRequest: action.data,
      });
    case actions.CHANNEL_DATA_UPDATE:
      return Object.assign({}, state, {
        showChannel: Object.assign({}, state.showChannel, {
          channelData: action.data,
        }),
      });
    case actions.CHANNEL_CLAIMS_DATA_UPDATE:
      return Object.assign({}, state, {
        showChannel: Object.assign({}, state.showChannel, {
          channelClaimsData: action.data,
        }),
      });
    case actions.ASSET_CLAIM_DATA_UPDATE:
      return Object.assign({}, state, {
        showAsset: {
          claimData: action.data,
        },
      });
    default:
      return state;
  }
}
