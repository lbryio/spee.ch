import siteConfig from '@config/siteConfig.json';

let initialState = {
  description        : 'default description',
  googleAnalyticsId  : 'default google id',
  host               : 'default host',
  title              : 'default title',
  twitter            : 'default twitter',
  defaultDescription : 'default description',
  defaultThumbnail   : 'default thumbnail',
  closedRegistration : false,
  serveOnlyApproved  : false,
  publishOnlyApproved: false,
  approvedChannels   : [],

};

if (siteConfig) {
  const {
    analytics: {
      googleId: googleAnalyticsId,
    },
    assetDefaults: {
      thumbnail: defaultThumbnail,
      description: defaultDescription,
    },
    details: {
      description,
      host,
      title,
      twitter,
    },
    publishing: {
      closedRegistration,
      serveOnlyApproved,
      publishOnlyApproved,
      approvedChannels,
    },
  } = siteConfig;

  initialState = {
    description,
    googleAnalyticsId,
    host,
    title,
    twitter,
    defaultDescription,
    defaultThumbnail,
    closedRegistration,
    serveOnlyApproved,
    publishOnlyApproved,
    approvedChannels,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};
