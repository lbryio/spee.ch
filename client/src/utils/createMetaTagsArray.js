const createMetaTagsArray = (metaTagsObject) => {
  let metaTagsArray = [];
  for (let key in metaTagsObject) {
    if (metaTagsObject.hasOwnProperty(key)) {
      metaTagsArray.push({
        property: key,
        content : metaTagsObject[key],
      });
    }
  }
  return metaTagsArray;
};

export default createMetaTagsArray;
