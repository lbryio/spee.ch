import * as actions from 'constants/show_action_types';

const initialState = {
  request: {
    channel: {
      name: null,
      id  : null,
    },
    claim: {
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
  },
  channelData: {
    channelName : null,
    claims      : null,
    currentPage : null,
    previousPage: null,
    totalPages  : null,
    totalResults: null,
  },
  claimData: {
    FileId         : null,
    address        : null,
    amount         : null,
    author         : null,
    certificateId  : null,
    channelName    : null,
    claimId        : null,
    claimSequence  : null,
    claimType      : null,
    contentType    : null,
    createdAt      : null,
    decodedClaim   : null,
    depth          : null,
    description    : null,
    effectiveAmount: null,
    fileExt        : null,
    hasSignature   : null,
    height         : null,
    hex            : null,
    host           : null,
    id             : null,
    language       : null,
    license        : null,
    licenseUrl     : null,
    metadataVersion: null,
    name           : null,
    nout           : null,
    nsfw           : null,
    outpoint       : null,
    preview        : null,
    source         : null,
    sourceType     : null,
    sourceVersion  : null,
    streamVersion  : null,
    thumbnail      : null,
    title          : null,
    txid           : null,
    updatedAt      : null,
    validAtHeight  : null,
    valueVersion   : null,
  },
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
        channelData: action.channelData,
      });
    case actions.CLAIM_DATA_UPDATE:
      return Object.assign({}, state, {
        claimData: action.claimData,
      });
    default:
      return state;
  }
}
