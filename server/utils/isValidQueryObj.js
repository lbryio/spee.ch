const {
  serving: { dynamicFileSizing },
} = require('@config/siteConfig');
const { maxDimension } = dynamicFileSizing;

const isValidQueryObj = queryObj => {
  let {
    h: cHeight = null,
    w: cWidth = null,
    t: transform = null,
    x: xOrigin = null,
    y: yOrigin = null,
  } = queryObj;

  return (
    ((cHeight <= maxDimension && cHeight > 0) || cHeight === null) &&
    ((cWidth <= maxDimension && cWidth > 0) || cWidth === null) &&
    (transform === null || transform === 'crop' || transform === 'stretch') &&
    ((xOrigin <= maxDimension && xOrigin >= 0) || xOrigin === null) &&
    ((yOrigin <= maxDimension && yOrigin >= 0) || yOrigin === null)
  );
};
export default isValidQueryObj;
