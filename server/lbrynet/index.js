import axios from 'axios';
import logger from 'winston';
import db from 'server/models';
import { handleLbrynetResponse } from './utils/handleLbrynetResponse.js';
import { apiHost, apiPort, getTimeout } from '@config/lbryConfig';
import { chooseGaLbrynetPublishLabel, sendGATimingEvent } from '../utils/googleAnalytics.js';
import { publishing } from '@config/siteConfig';

const lbrynetUri = 'http://' + apiHost + ':' + apiPort;

export function publishClaim(publishParams) {
  logger.debug(`lbryApi >> Publishing claim to "${publishParams.name}"`);
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'publish',
        params: publishParams,
      })
      .then(response => {
        sendGATimingEvent(
          'lbrynet',
          'publish',
          chooseGaLbrynetPublishLabel(publishParams),
          gaStartTime,
          Date.now()
        );
        handleLbrynetResponse(response, resolve, reject);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getClaim(uri) {
  logger.debug(`lbryApi >> Getting Claim for "${uri}"`);
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'get',
        params: {
          uri,
          timeout: getTimeout || 30,
        },
      })
      .then(response => {
        sendGATimingEvent('lbrynet', 'getClaim', 'GET', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function abandonClaim({ claimId }) {
  logger.debug(`lbryApi >> Abandon claim "${claimId}"`);
  const gaStartTime = Date.now();
  try {
    const abandon = await axios.post(lbrynetUri, {
      method: 'claim_abandon',
      params: { claim_id: claimId },
    });
    sendGATimingEvent('lbrynet', 'abandonClaim', 'ABANDON_CLAIM', gaStartTime, Date.now());
    return abandon.data;
  } catch (error) {
    logger.error(error);
    return error;
  }
}

export function getFileListFileByOutpoint(outpoint) {
  logger.debug(`lbryApi >> Getting File_List for "${outpoint}"`);
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'file_list',
        params: {
          outpoint,
        },
      })
      .then(response => {
        sendGATimingEvent('lbrynet', 'getFileList', 'FILE_LIST', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getClaimList(claimName) {
  logger.debug(`lbryApi >> Getting claim_list for "${claimName}"`);
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'claim_list',
        params: { name: claimName },
      })
      .then(response => {
        sendGATimingEvent('lbrynet', 'getClaimList', 'CLAIM_LIST', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function resolveUri(uri) {
  logger.debug(`lbryApi >> Resolving URI for "${uri}"`);
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'resolve',
        params: { urls: uri },
      })
      .then(({ data }) => {
        sendGATimingEvent('lbrynet', 'resolveUri', 'RESOLVE', gaStartTime, Date.now());
        if (Object.keys(data.result).length === 0 && data.result.constructor === Object) {
          // workaround for daemon returning empty result object
          // https://github.com/lbryio/lbry/issues/1485
          db.Claim.findOne({ where: { claimId: uri.split('#')[1] } })
            .then(() => reject('This claim has not yet been confirmed on the LBRY blockchain'))
            .catch(() => reject(`Claim ${uri} does not exist`));
        } else if (data.result[uri].error) {
          // check for errors
          reject(data.result[uri].error);
        } else {
          // if no errors, resolve
          resolve(data.result[uri]);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getDownloadDirectory() {
  logger.debug('lbryApi >> Retrieving the download directory path from lbry daemon...');
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'settings_get',
      })
      .then(({ data }) => {
        sendGATimingEvent(
          'lbrynet',
          'getDownloadDirectory',
          'SETTINGS_GET',
          gaStartTime,
          Date.now()
        );
        if (data.result) {
          resolve(data.result.download_directory);
        } else {
          return new Error(
            'Successfully connected to lbry daemon, but unable to retrieve the download directory.'
          );
        }
      })
      .catch(error => {
        logger.error('Lbrynet Error:', error);
        resolve('/home/lbry/Downloads/');
      });
  });
}
export function createChannel(name) {
  logger.debug(`lbryApi >> Creating channel for ${name}...`);
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'channel_new',
        params: {
          channel_name: name,
          amount: publishing.channelClaimBidAmount,
        },
      })
      .then(response => {
        sendGATimingEvent('lbrynet', 'createChannel', 'CHANNEL_NEW', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getAccountBalance() {
  const gaStartTime = Date.now();
  return new Promise((resolve, reject) => {
    axios
      .post(lbrynetUri, {
        method: 'account_balance',
      })
      .then(response => {
        sendGATimingEvent('lbrynet', 'getAccountBalance', 'SETTINGS_GET', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      })
      .catch(error => {
        reject(error);
      });
  });
}
