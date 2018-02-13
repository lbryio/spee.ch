import * as actions from 'constants/show_action_types';
import { CHANNEL, ASSET } from 'constants/show_request_types';
import { LOCAL_CHECK, ERROR } from 'constants/asset_display_states';

const initialState = {
  request: {
    error    : null,
    type     : null,
    data     : null,
    requestId: null,
  },
  displayAsset: {
    error : null,
    status: LOCAL_CHECK,
  },
  channelRequests: {},
  channelList    : {},
  assetRequests  : {},
  assetList      : {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    // handle request
    case actions.REQUEST_ERROR:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          error: action.data,
        }),
      });
    case actions.REQUEST_UPDATE_CHANNEL:
      return Object.assign({}, state, {
        request: {
          type : CHANNEL,
          error: null,
          id   : action.data.requestId,
          data : {
            name: action.data.name,
            id  : action.data.id,
          },
        },
      });
    case actions.REQUEST_UPDATE_CLAIM:
      return Object.assign({}, state, {
        request: {
          type : ASSET,
          error: null,
          id   : action.data.requestId,
          data : {
            name     : action.data.name,
            modifier : action.data.modifier,
            extension: action.data.extension,
          },
        },
      });
    // successful requests
    case actions.ASSET_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        assetRequests: Object.assign({}, state.assetRequests, {
          [action.data.id]: {
            error  : action.data.error,
            name   : action.data.name,
            claimId: action.data.claimId,
          },
        }),
      });
    case actions.CHANNEL_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        channelRequests: Object.assign({}, state.channelRequests, {
          [action.data.id]: {
            error  : action.data.error,
            name   : action.data.name,
            longId : action.data.longId,
            shortId: action.data.shortId,
          },
        }),
      });
    // updates to asset list
    case actions.ASSET_NEW_SUCCESS:
      return Object.assign({}, state, {
        assetList: Object.assign({}, state.assetList, {
          [action.data.id]: {
            error    : action.data.error,
            name     : action.data.name,
            claimId  : action.data.claimId,
            shortId  : action.data.shortId,
            claimData: action.data.claimData,
          },
        }),
      });
    // updates to channel list
    case actions.CHANNEL_NEW_SUCCESS:
      return Object.assign({}, state, {
        channelList: Object.assign({}, state.channelList, {
          [action.data.id]: {
            name      : action.data.name,
            longId    : action.data.longId,
            shortId   : action.data.shortId,
            claimsData: action.data.claimsData,
          },
        }),
      });
    case actions.CHANNEL_CLAIMS_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        channelList: Object.assign({}, state.channelList, {
          [action.data.channelListId]: Object.assign({}, state.channelList[action.data.channelListId], {
            claimsData: action.data.claimsData,
          }),
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
