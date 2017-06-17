const lbryApi = require('../helpers/libraries/lbryApi.js')
const db = require('../models')

const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js')
const isFreePublicClaim = require('../helpers/functions/isFreePublicClaim.js')

function getClaimAndHandleResponse (claimUri, resolve, reject) {
  lbryApi
    .getClaim(claimUri)
    .then(({ file_name, download_path, mime_type }) => {
      resolve({
        file_name,
        file_path: download_path,
        file_type: mime_type,
      })
    })
    .catch(error => {
      reject(error)
    })
}

module.exports = {
  getClaimByName (claimName) {
    const deferred = new Promise((resolve, reject) => {
      console.log('>> lbryHelpers >> getClaim BasedOnNameOnly:', claimName)
      // get all free public claims
      getAllFreePublicClaims(claimName)
        .then(freePublicClaimList => {
          console.log('>> Decided on public claim id:', freePublicClaimList[0].claim_id)
          const freePublicClaimOutpoint = `${freePublicClaimList[0].txid}:${freePublicClaimList[0].nout}`
          const freePublicClaimUri = `${freePublicClaimList[0].name}#${freePublicClaimList[0].claim_id}`
          // check to see if the file is available locally
          db.File
            .findOne({ where: { claim_id: freePublicClaimList[0].claim_id } })
            .then(claim => {
              // if a found locally...
              if (claim) {
                console.log('>> A matching claim_id was found locally')
                // if the outpoint's match return it
                if (claim.dataValues.outpoint === freePublicClaimOutpoint) {
                  console.log('>> Local outpoint matched')
                  resolve(claim.dataValues)
                  // if the outpoint's don't match, fetch updated claim
                } else {
                  console.log('>> local outpoint did not match')
                  getClaimAndHandleResponse(freePublicClaimUri, resolve, reject)
                }
                // ... otherwise use daemon to retrieve it
              } else {
                // 'get' the claim
                getClaimAndHandleResponse(freePublicClaimUri, resolve, reject)
              }
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
    return deferred
  },
  getClaimByClaimId (claimName, claimId) {
    const deferred = new Promise((resolve, reject) => {
      const uri = `${claimName}#${claimId}`
      console.log('>> lbryHelpers >> getClaimBasedOnUri:', uri)
      // resolve the Uri
      lbryApi
        .resolveUri(uri) // note: use 'spread' and make parallel with db.File.findOne()
        .then(result => {
          // note should just be 'result' returned.
          // get the outpoint
          const resolvedOutpoint = `${result[uri].claim.txid}:${result[uri].claim.nout}`
          // check locally for the claim
          db.File
            .findOne({ where: { claim_id: claimId } })
            .then(claim => {
              // if a found locally...
              if (claim) {
                console.log('>> A matching claim_id was found locally')
                // if the outpoint's match return it
                if (claim.dataValues.outpoint === resolvedOutpoint) {
                  console.log('>> Local outpoint matched')
                  resolve(claim.dataValues)
                  // if the outpoint's don't match, fetch updated claim
                } else {
                  console.log('>> Local outpoint did not match')
                  getClaimAndHandleResponse(uri, resolve, reject)
                }
                // ... otherwise use daemon to retrieve it
              } else {
                // check to make sure it is free and public  (note: no need for another resolve?)
                if (isFreePublicClaim(result[uri].claim)) {
                  // 'get' the claim
                  getClaimAndHandleResponse(uri, resolve, reject)
                } else {
                  reject('NO_FREE_PUBLIC_CLAIMS')
                }
              }
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
    return deferred
  },
}
