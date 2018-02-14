import * as actions from 'constants/show_action_types';
import { LOCAL_CHECK, ERROR } from 'constants/asset_display_states';

const initialState = {
  request: {
    error: null,
    type : null,
    id   : null,
  },
  channelRequests: {},
  channelList    : {},
  assetRequests  : {},
  assetList      : {},
  displayAsset   : {
    error : null,
    status: LOCAL_CHECK,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    // handle request
    case actions.REQUEST_UPDATE_ERROR:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          error: action.data,
        }),
      });
    case actions.CHANNEL_REQUEST_NEW:
    case actions.ASSET_REQUEST_NEW:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          type: action.data.requestType,
          id  : action.data.requestId,
        }),
      });
    // asset actions
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
    case actions.ASSET_ADD:
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
    // channel actions
    case actions.CHANNEL_REQUEST_ADD:
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
    case actions.CHANNEL_ADD:
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
