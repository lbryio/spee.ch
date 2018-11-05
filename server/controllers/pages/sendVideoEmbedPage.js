const {
  assetDefaults: { thumbnail },
  details: { host },
} = require('@config/siteConfig');

const padSizes = {
  small: 'padSmall',
  medium: 'padMedium',
  large: 'padLarge',
};

const argumentProcessors = {
  'bottom': async (config) => {
    config.classNames.push('bottom');
    return;
  },
  'right': async (config) => {
    config.classNames.push('right');
    return;
  },
  'pad': async (config, val) => {
    config.classNames.push(padSizes[val]);
    return;
  },
  'logoClaim': async (config, val) => {
    config.logoUrl = `${host}/${val}`;
    return;
  },
  'link': async (config, val) => {
    config.logoLink = val;
    return;
  }
};

const parseLogoConfigParam = async (rawConfig) => {
  if(rawConfig) {
    let parsedConfig = {
      classNames: ['logoLink'],
      logoUrl: thumbnail,
    };
    let splitConfig;
    try {
      splitConfig = rawConfig.split(',');
    } catch(e) { }

    if(!splitConfig) {
      return false;
    }

    for(let i = 0; i < splitConfig.length; i++) {
      let currentArgument = splitConfig[i];

      if(argumentProcessors[currentArgument]) {
        await argumentProcessors[currentArgument](parsedConfig);
      } else {
        const splitArgument = currentArgument.split(':');
        if(argumentProcessors[splitArgument[0]]) {
          await argumentProcessors[splitArgument[0]](parsedConfig, splitArgument[1]);
        }
      }
    }

    parsedConfig.classNames = parsedConfig.classNames.join(' ');

    return parsedConfig;
  }

  return false;
}

const sendVideoEmbedPage = async ({ params }, res) => {
  let {
    claimId,
    config,
    name,
  } = params;

  // if channel then swap name and claimId for order
  if (name[0] === '@' && name.includes(':')) {
    const temp = name;
    name = claimId;
    claimId = temp;
  }

  const logoConfig = await parseLogoConfigParam(config);

  // test setting response headers
  console.log('removing x-frame-options');
  res.removeHeader('X-Frame-Options');
  // get and render the content
  res.status(200).render('embed', { host, claimId, name, logoConfig });
};

module.exports = sendVideoEmbedPage;
