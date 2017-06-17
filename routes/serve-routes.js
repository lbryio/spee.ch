const errorHandlers = require('../helpers/libraries/errorHandlers.js')
const serveController = require('../controllers/serveController.js')

function serveFile ({ fileType, filePath }, res) {
  // set default options
  const options = {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Content-Type'          : fileType,
    },
  }
  // adjust default options as needed
  switch (fileType) {
    case 'image/jpeg':
      break
    case 'image/gif':
      break
    case 'image/png':
      break
    case 'video/mp4':
      break
    default:
      console.log('sending unknown file type as .jpeg')
      options['headers']['Content-Type'] = 'image/jpeg'
      break
  }
  // send file
  res.status(200).sendFile(filePath, options)
}

module.exports = (app, ua, googleAnalyticsId) => {
  // route to fetch one free public claim
  app.get('/:name/:claim_id', ({ params }, res) => {
    const routeString = `${params.name}/${params.claim_id}`
    // google analytics
    ua(googleAnalyticsId, { https: true }).event('Serve Route', '/name/claimId', routeString).send()
    // begin image-serve processes
    console.log(`>> GET request on /${routeString}`)
    serveController
      .getClaimByClaimId(params.name, params.claim_id)
      .then(fileInfo => {
        console.log('/:name/:claim_id success.', fileInfo.file_name)
        serveFile(fileInfo, res)
      })
      .catch(error => {
        console.log('/:name/:claim_id error:', error)
        errorHandlers.handleRequestError(error, res)
      })
  })
  // route to fetch one free public claim
  app.get('/:name', ({ params }, res) => {
    // google analytics
    ua(googleAnalyticsId, { https: true }).event('Serve Route', '/name', params.name).send()
    // begin image-serve processes
    console.log(`>> GET request on /${params.name}`)
    serveController
      .getClaimByName(params.name)
      .then(fileInfo => {
        console.log('/:name success.', fileInfo.file_name)
        serveFile(fileInfo, res)
      })
      .catch(error => {
        console.log('/:name error:', error)
        errorHandlers.handleRequestError(error, res)
      })
  })
}
