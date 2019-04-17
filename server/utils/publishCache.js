import NodeCache from 'node-cache';
const CACHE_TIMEOUT_IN_SECONDS = 10;
const publishCache = new NodeCache({ stdTTL: CACHE_TIMEOUT_IN_SECONDS });
/*
  This module is used for tracking recent publishes for
  the brief time before they show up on chainquery.

  It will be used in Publish, Update, Availability and other situations.

  On publish, we'll publishCache.set( 'claimId', publishData.{outpoint}' ).

  On view we'll publishCache.get( 'claimId' ) and use the
  outPoint to do a sdk file list query.

  Entries will be removed when chainquery returns matching value.

  _decide whether we're cloning objects or getting references: useClones: true (default)

 */

export default publishCache;
