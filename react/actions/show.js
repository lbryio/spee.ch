import * as actions from 'constants/show_action_types';

// export action creators

export function updateClaimRequest (claim) {
  return {
    type: actions.CLAIM_REQUEST_UPDATE,
    claim,
  };
};

export function updateChannelRequest (channel) {
  return {
    type: actions.CHANNEL_REQUEST_UPDATE,
    channel,
  };
};

export function updateChannelData (name, longId, shortId) {
  return {
    type: actions.CHANNEL_DATA_UPDATE,
    name,
    longId,
    shortId,
  };
};

export function updateChannelClaimsData (claims, currentPage, totalPages, totalClaims) {
  return {
    type: actions.CHANNEL_CLAIMS_UPDATE,
    claims,
    currentPage,
    totalPages,
    totalClaims,
  };
};

export function updateClaimData (claimData) {
  return {
    type: actions.CHANNEL_DATA_UPDATE,
  };
};
