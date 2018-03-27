const logger = require('winston');
const { details: { host } } = require('../../config/siteConfig.js');
const { db } = require('../../config/mysqlConfig.js');
const { claimNameIsAvailable, checkChannelAvailability, publish } = require('../controllers/publishController.js');
const { getClaimList, resolveUri, getClaim } = require('../helpers/lbryApi.js');
const { addGetResultsToFileData, createBasicPublishParams, createThumbnailPublishParams, parsePublishApiRequestBody, parsePublishApiRequestFiles, createFileData } = require('../helpers/publishHelpers.js');
const errorHandlers = require('../helpers/errorHandlers.js');
const { sendGATimingEvent } = require('../helpers/googleAnalytics.js');
const { authenticateUser } = require('../auth/authentication.js');
const { getChannelData, getChannelClaims, getClaimId } = require('../controllers/serveController.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

const apiRoutes = {
  // route to check whether site has published to a channel
  channelAvailabilityRoute ({ ip, originalUrl, params: { name } }, res) {
    const gaStartTime = Date.now();
    checkChannelAvailability(name)
      .then(availableName => {
        res.status(200).json(availableName);
        sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to get a short channel id from long channel Id
  channelShortIdRoute ({ ip, originalUrl, params }, res) {
    console.log('hello');
    logger.debug('host:', host);
    logger.debug('db:', db);
    db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name)
      .then(shortId => {
        res.status(200).json(shortId);
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  channelDataRoute ({ ip, originalUrl, body, params }, res) {
    const channelName = params.channelName;
    let channelClaimId = params.channelClaimId;
    if (channelClaimId === 'none') channelClaimId = null;
    getChannelData(channelName, channelClaimId, 0)
      .then(data => {
        if (data === NO_CHANNEL) {
          return res.status(404).json({success: false, message: 'No matching channel was found'});
        }
        res.status(200).json({success: true, data});
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  channelClaimsRoute ({ ip, originalUrl, body, params }, res) {
    const channelName = params.channelName;
    let channelClaimId = params.channelClaimId;
    if (channelClaimId === 'none') channelClaimId = null;
    const page = params.page;
    getChannelClaims(channelName, channelClaimId, page)
      .then(data => {
        if (data === NO_CHANNEL) {
          return res.status(404).json({success: false, message: 'No matching channel was found'});
        }
        res.status(200).json({success: true, data});
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to run a claim_list request on the daemon
  claimListRoute ({ ip, originalUrl, params }, res) {
    getClaimList(params.name)
      .then(claimsList => {
        res.status(200).json(claimsList);
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to get an asset
  claimGetRoute ({ ip, originalUrl, params }, res) {
    const name = params.name;
    const claimId = params.claimId;
    // resolve the claim
    db.Claim.resolveClaim(name, claimId)
      .then(resolveResult => {
        // make sure a claim actually exists at that uri
        if (!resolveResult) {
          throw new Error('No matching uri found in Claim table');
        }
        let fileData = createFileData(resolveResult);
        // get the claim
        return Promise.all([fileData, getClaim(`${name}#${claimId}`)]);
      })
      .then(([ fileData, getResult ]) => {
        fileData = addGetResultsToFileData(fileData, getResult);
        return Promise.all([db.upsert(db.File, fileData, {name, claimId}, 'File'), getResult]);
      })
      .then(([ fileRecord, {message, completed} ]) => {
        res.status(200).json({ success: true, message, completed });
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to check whether this site published to a claim
  claimAvailabilityRoute ({ ip, originalUrl, params: { name } }, res) {
    const gaStartTime = Date.now();
    claimNameIsAvailable(name)
      .then(result => {
        res.status(200).json(result);
        sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to run a resolve request on the daemon
  claimResolveRoute ({ headers, ip, originalUrl, params }, res) {
    resolveUri(`${params.name}#${params.claimId}`)
      .then(resolvedUri => {
        res.status(200).json(resolvedUri);
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to run a publish request on the daemon
  claimPublishRoute ({ body, files, headers, ip, originalUrl, user }, res) {
    // define variables
    let  channelName, channelId, channelPassword, description, fileName, filePath, fileType, gaStartTime, license, name, nsfw, thumbnail, thumbnailFileName, thumbnailFilePath, thumbnailFileType, title;
    // record the start time of the request
    gaStartTime = Date.now();
    // validate the body and files of the request
    try {
      // validateApiPublishRequest(body, files);
      ({name, nsfw, license, title, description, thumbnail} = parsePublishApiRequestBody(body));
      ({fileName, filePath, fileType, thumbnailFileName, thumbnailFilePath, thumbnailFileType} = parsePublishApiRequestFiles(files));
      ({channelName, channelId, channelPassword} = body);
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
    // check channel authorization
    Promise.all([
      authenticateUser(channelName, channelId, channelPassword, user),
      claimNameIsAvailable(name),
      createBasicPublishParams(filePath, name, title, description, license, nsfw, thumbnail),
      createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw),
    ])
      .then(([{channelName, channelClaimId}, validatedClaimName, publishParams, thumbnailPublishParams]) => {
        // add channel details to the publish params
        if (channelName && channelClaimId) {
          publishParams['channel_name'] = channelName;
          publishParams['channel_id'] = channelClaimId;
        }
        // publish the thumbnail
        if (thumbnailPublishParams) {
          publish(thumbnailPublishParams, thumbnailFileName, thumbnailFileType);
        }
        // publish the asset
        return publish(publishParams, fileName, fileType);
      })
      .then(result => {
        res.status(200).json({
          success: true,
          message: 'publish completed successfully',
          data   : {
            name,
            claimId: result.claim_id,
            url    : `${host}/${result.claim_id}/${name}`,
            lbryTx : result,
          },
        });
        // record the publish end time and send to google analytics
        sendGATimingEvent('end-to-end', 'publish', fileType, gaStartTime, Date.now());
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to get a short claim id from long claim Id
  claimShortIdRoute ({ ip, originalUrl, body, params }, res) {
    db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name)
      .then(shortId => {
        res.status(200).json({success: true, data: shortId});
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  claimLongIdRoute ({ ip, originalUrl, body, params }, res) {
    logger.debug('body:', body);
    const channelName = body.channelName;
    const channelClaimId = body.channelClaimId;
    const claimName = body.claimName;
    const claimId = body.claimId;
    getClaimId(channelName, channelClaimId, claimName, claimId)
      .then(result => {
        if (result === NO_CHANNEL) {
          return res.status(404).json({success: false, message: 'No matching channel could be found'});
        }
        if (result === NO_CLAIM) {
          return res.status(404).json({success: false, message: 'No matching claim id could be found'});
        }
        res.status(200).json({success: true, data: result});
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  claimDataRoute ({ ip, originalUrl, body, params }, res) {
    const claimName = params.claimName;
    let claimId = params.claimId;
    if (claimId === 'none') claimId = null;
    db.Claim.resolveClaim(claimName, claimId)
      .then(claimInfo => {
        if (!claimInfo) {
          return res.status(404).json({success: false, message: 'No claim could be found'});
        }
        res.status(200).json({success: true, data: claimInfo});
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
  // route to see if asset is available locally
  fileAvailabilityRoute ({ ip, originalUrl, params }, res) {
    const name = params.name;
    const claimId = params.claimId;
    db.File.findOne({where: {name, claimId}})
      .then(result => {
        if (result) {
          return res.status(200).json({success: true, data: true});
        }
        res.status(200).json({success: true, data: false});
      })
      .catch(error => {
        errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
      });
  },
};

module.exports = apiRoutes;
