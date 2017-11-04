module.exports = {
  returnShortId: function (result, longId) {
    let claimIndex;
    let shortId = longId.substring(0, 1); // default sort id is the first letter
    let shortIdLength = 0;
    // find the index of this claim id
    claimIndex = result.findIndex(element => {
      return element.claimId === longId;
    });
    if (claimIndex < 0) {
      throw new Error('claim id not found in claims list');
    }
    // get an array of all claims with lower height
    let possibleMatches = result.slice(0, claimIndex);
    // remove certificates with the same prefixes until none are left.
    while (possibleMatches.length > 0) {
      shortIdLength += 1;
      shortId = longId.substring(0, shortIdLength);
      possibleMatches = possibleMatches.filter(element => {
        return (element.claimId.substring(0, shortIdLength) === shortId);
      });
    }
    return shortId;
  },
};
