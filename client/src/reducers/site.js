const customizedSiteReducer = (siteConfig) => {
  let initialState = {};
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
    } = siteConfig;

    initialState = {
      description,
      googleAnalyticsId,
      host,
      title,
      twitter,
      defaultDescription,
      defaultThumbnail,
    };
  } else {
    initialState = {
      description       : 'default description',
      googleAnalyticsId : 'default google id',
      host              : 'default host',
      title             : 'default title',
      twitter           : 'default twitter',
      defaultDescription: 'default description',
      defaultThumbnail  : 'default thumbnail',
    };
  }
  return (state = initialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
};

export default customizedSiteReducer;
