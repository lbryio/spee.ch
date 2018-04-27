const returnShortId = (claimsArray, longId) => {
  let claimIndex;
  let shortId = longId.substring(0, 1); // default short id is the first letter
  let shortIdLength = 0;
  // find the index of this claim id
  claimIndex = claimsArray.findIndex(element => {
    return element.claimId === longId;
  });
  if (claimIndex < 0) {
    throw new Error('claim id not found in claims list');
  }
  // get an array of all claims with lower height
  let possibleMatches = claimsArray.slice(0, claimIndex);
  // remove certificates with the same prefixes until none are left.
  while (possibleMatches.length > 0) {
    shortIdLength += 1;
    shortId = longId.substring(0, shortIdLength);
    possibleMatches = possibleMatches.filter(element => {
      return (element.claimId && (element.claimId.substring(0, shortIdLength) === shortId));
    });
  }
  return shortId;
};

module.exports = returnShortId;
