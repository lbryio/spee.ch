import logger from 'winston';
import db from 'server/models';

let blockList = new Set();

export const setupBlockList = (intervalInSeconds = 60) => {
  const fetchList = () => {
    return new Promise((resolve, reject) => {
      db.Blocked.getBlockList()
        .then(result => {
          blockList.clear();
          if (result.length > 0) {
            result.map(item => {
              blockList.add(item.dataValues.outpoint);
            });
            resolve();
          } else reject();
        })
        .catch(e => {
          console.error('list was empty', e);
        });
    });
  };
  setInterval(() => {
    fetchList();
  }, intervalInSeconds * 1000);
  return fetchList();
};

export const isBlocked = outpoint => {
  return blockList.has(outpoint);
};
