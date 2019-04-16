const queryObject = {};
// TODO: replace quick/dirty try catch with better practice
export default originalUrl => {
  try {
    originalUrl
      .split('?')[1]
      .split('&')
      .map(pair => {
        if (pair.includes('=')) {
          let parr = pair.split('=');
          queryObject[parr[0]] = parr[1];
        } else queryObject[pair] = true;
      });
    return queryObject;
  } catch (e) {}
};
