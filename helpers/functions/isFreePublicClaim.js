module.exports = ({ value }) => {
  console.log('>> check: isFreePublicClaim?')
  if (
    (value.stream.metadata.license.indexOf('Public Domain') !== -1 || value.stream.metadata.license.indexOf('Creative Commons') !== -1) &&
    (!value.stream.metadata.fee || value.stream.metadata.fee.amount === 0)
  ) {
    return true
  } else {
    return false
  }
}
