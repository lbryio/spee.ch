import * as actions from 'constants/show_action_types';
import { CHANNEL, ASSET } from 'constants/show_request_types';
import { LOCAL_CHECK, ERROR } from 'constants/asset_display_states';

const initialState = {
  request: {
    error: null,
    type : null,
  },
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
    error    : null,
    claimData: null,
    shortId  : null,
  },
  displayAsset: {
    error : null,
    status: LOCAL_CHECK,
  },
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_CHANNEL_UPDATE:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          type: CHANNEL,
        }),
        channelRequest: action.data,
      });
    case actions.REQUEST_CLAIM_UPDATE:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          type: ASSET,
        }),
        assetRequest: action.data,
      });
    case actions.REQUEST_ERROR_UPDATE:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          error: action.data,
        }),
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
        showAsset: Object.assign({}, state.showAsset, {
          claimData: action.data.data,
          shortId  : action.data.shortId,
        }),
      });
    case actions.SHOW_ASSET_ERROR:
      return Object.assign({}, state, {
        showAsset: Object.assign({}, state.showAsset, {
          error: action.data,
        }),
      });
    case actions.FILE_AVAILABILITY_UPDATE:
      return Object.assign({}, state, {
        displayAsset: Object.assign({}, state.displayAsset, {
          status: action.data,
        }),
      });
    case actions.DISPLAY_ASSET_ERROR:
      return Object.assign({}, state, {
        displayAsset: Object.assign({}, state.displayAsset, {
          error : action.data,
          status: ERROR,
        }),
      });
    default:
      return state;
  }
}
