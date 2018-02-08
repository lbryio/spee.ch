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
    error      : null,
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
    name     : null,
    claimId  : null,
    shortId  : null,
    claimData: null,
  },
  displayAsset: {
    error : null,
    status: LOCAL_CHECK,
  },
  channelRequests: {},
  channels       : {},  // same schema as showChannel
  assetRequests  : {},
  assets         : {},  // same schema as showAsset
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    // handle request
    case actions.REQUEST_ERROR_UPDATE:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          error: action.data,
        }),
      });
    case actions.REQUEST_CHANNEL_UPDATE:
      return Object.assign({}, state, {
        request: {
          type : CHANNEL,
          error: null,
        },
        channelRequest: action.data,
      });
    case actions.REQUEST_CLAIM_UPDATE:
      return Object.assign({}, state, {
        request: {
          type : ASSET,
          error: null,
        },
        assetRequest: action.data,
      });
    // request for an asset
    case actions.ASSET_REQUEST_ADD:
      return Object.assign({}, state, {
        assetRequests: Object.assign({}, state.assets, {
          [action.data.id]: {
            error  : action.data.error,
            name   : action.data.name,
            claimId: action.data.claimId,
          },
        }),
      });
    // show an asset
    case actions.SHOW_ASSET_UPDATE:
      return Object.assign({}, state, {
        assets: Object.assign({}, state.assets, {
          [action.data.id]: {
            error    : action.data.error,
            name     : action.data.name,
            claimId  : action.data.claimId,
            shortId  : action.data.shortId,
            claimData: action.data.claimData,
          },
        }),
        showAsset: Object.assign({}, state.showAsset, {
          error    : action.data.error,
          name     : action.data.name,
          claimId  : action.data.claimId,
          shortId  : action.data.shortId,
          claimData: action.data.claimData,
        }),
      });
    case actions.SHOW_ASSET_CLEAR:
      return Object.assign({}, state, {
        showAsset: Object.assign({}, state.showAsset, {
          error    : null,
          name     : null,
          claimId  : null,
          shortId  : null,
          claimData: null,
        }),
      });
    // request a channel

    // show a channel
    case actions.SHOW_CHANNEL_ERROR:
      return Object.assign({}, state, {
        showChannel: Object.assign({}, state.showChannel, {
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
    // display an asset
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
