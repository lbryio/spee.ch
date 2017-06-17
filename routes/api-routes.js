const errorHandlers = require('../helpers/libraries/errorHandlers.js')
const lbryApi = require('../helpers/libraries/lbryApi.js')

module.exports = app => {
  // route to run a claim_list request on the daemon
  app.get('/api/claim_list/:claim', ({ params }, res) => {
    lbryApi
      .getClaimsList(params.claim)
      .then(claimsList => {
        console.log('/api/claim_list/:claim success.')
        res.status(200).json(claimsList)
      })
      .catch(error => {
        console.log('/api/claim_list/:name error:', error)
        errorHandlers.handleRequestError(error, res)
      })
  })
  // route to run a resolve request on the daemon
  app.get('/api/resolve/:uri', ({ params }, res) => {
    lbryApi
      .resolveUri(params.uri)
      .then(resolvedUri => {
        console.log('/api/resolve/:claim success.')
        res.status(200).json(resolvedUri)
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res)
      })
  })
}
